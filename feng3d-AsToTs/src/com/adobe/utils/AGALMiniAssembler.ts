/*
Copyright (c) 2011, Adobe Systems Incorporated
All rights reserved.

Redistribution and use in source and binary forms, with or without 
modification, are permitted provided that the following conditions are
met:

* Redistributions of source code must retain the above copyright notice, 
this list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the 
documentation and/or other materials provided with the distribution.

* Neither the name of Adobe Systems Incorporated nor the names of its 
contributors may be used to endorse or promote products derived from 
this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
module feng3d
{
	// ===========================================================================
	//	Imports
	// ---------------------------------------------------------------------------
	*;
	*;
	
	// ===========================================================================
	//	Class
	// ---------------------------------------------------------------------------
	export class AGALMiniAssembler
	{		// ======================================================================
		//	Constants
		// ----------------------------------------------------------------------				
		protected static REGEXP_OUTER_SPACES:RegExp		= /^\s+|\s+$/g;
		
		// ======================================================================
		//	Properties
		// ----------------------------------------------------------------------
		// AGAL bytes and error buffer 
		private _agalcode:ByteArray							= null;
		private _error:string								= "";
		
		private debugEnabled:boolean						= false;
		
		private static initialized:boolean					= false;
		public verbose:boolean								= false;
		
		// ======================================================================
		//	Getters
		// ----------------------------------------------------------------------
		public get error():string						{ return _error; }
		public get agalcode():ByteArray				{ return _agalcode; }
		
		// ======================================================================
		//	Constructor
		// ----------------------------------------------------------------------
		constructor( debugging:boolean = false )
		{
			this.debugEnabled = debugging;
			if ( !initialized )
				this.init();
		}
		// ======================================================================
		//	Methods
		// ----------------------------------------------------------------------
		
		public assemble2( ctx3d : Context3D, version:number, vertexsrc:string, fragmentsrc:string ) : Program3D 
		{
			var agalvertex : ByteArray = this.assemble ( VERTEX, vertexsrc, version );
			var agalfragment : ByteArray = this.assemble ( FRAGMENT, fragmentsrc, version );
			var prog : Program3D = ctx3d.createProgram(); 
			prog.upload(agalvertex,agalfragment);
			return prog; 
		}
		
		public assemble( mode:string, source:string, version:number=2, ignorelimits:boolean=false ):ByteArray
		{
			var start:number = getTimer();
			
			this._agalcode							= new ByteArray();
			this._error = "";
			
			var isFrag:boolean = false;
			
			if ( mode == FRAGMENT )
				isFrag = true;
			else if ( mode != VERTEX )
				this._error = 'ERROR: mode needs to be "' + FRAGMENT + '" or "' + VERTEX + '" but is "' + mode + '".';
			
			this.agalcode.endian = Endian.LITTLE_ENDIAN;
			this.agalcode.writeByte( 0xa0 );				// tag version
			this.agalcode.writeUnsignedInt( version );		// AGAL version, big endian, bit pattern will be 0x01000000
			this.agalcode.writeByte( 0xa1 );				// tag program id
			this.agalcode.writeByte( isFrag ? 1 : 0 );	// vertex or fragment
			
			this.initregmap(version, ignorelimits); 
			
			var lines:Array = source.replace( /[\f\n\r\v]+/g, "\n" ).split( "\n" );
			//var nest:number = 0;
			var nops:number = 0;
			var i:number;
			var lng:number = lines.length;
			
			for ( i = 0; i < lng && this._error == ""; i++ )
			{
				var line:string = new string( lines[i] );
				line = line.replace( REGEXP_OUTER_SPACES, "" );
				
				// remove comments
				var startcomment:number = line.search( "//" );
				if ( startcomment != -1 )
					line = line.slice( 0, startcomment );
				
				// grab options
				var optsi:number = line.search( /<.*>/g );
				var opts:Array;
				if ( optsi != -1 )
				{
					opts = line.slice( optsi ).match( /([\w\.\-\+]+)/gi );
					line = line.slice( 0, optsi );
				}
				
				// find opcode
				var opCode:Array = line.match( /^\w{3}/ig );
				if ( !opCode ) 
				{
					if ( line.length >= 3 )
						trace( "warning: bad line "+i+": "+lines[i] );
					continue;
				}
				var opFound:OpCode = OPMAP[ opCode[0] ];
				
				// if debug is enabled, output the opcodes
				if ( this.debugEnabled )
					trace( opFound );
				
				if ( opFound == null )
				{
					if ( line.length >= 3 )
						trace( "warning: bad line "+i+": "+lines[i] );
					continue;
				}
				
				line = line.slice( line.search( opFound.name ) + opFound.name.length );
				
				if ( ( opFound.flags & OP_VERSION2 ) && version<2 )
				{
					this._error = "this.error: opcode requires version 2.";
					break;					
				}
				
				if ( ( opFound.flags & OP_VERT_ONLY ) && isFrag )
				{
					this._error = "this.error: opcode is only allowed in vertex programs.";
					break;
				}		
				
				if ( ( opFound.flags & OP_FRAG_ONLY ) && !isFrag )
				{
					this._error = "this.error: opcode is only allowed in fragment programs.";
					break;
				}
				if ( this.verbose )
					trace( "emit opcode=" + opFound );
				
				this.agalcode.writeUnsignedInt( opFound.emitCode );
				nops++;
				
				if ( nops > MAX_OPCODES )
				{
					this._error = "this.error: too many opcodes. maximum is "+MAX_OPCODES+".";
					break;
				}
				
				// get operands, use regexp
				var regs:Array;
				
				// will match both syntax
				regs = line.match( /vc\[([vof][acostdip]?)(\d*)?(\.[xyzw](\+\d{1,3})?)?\](\.[xyzw]{1,4})?|([vof][acostdip]?)(\d*)?(\.[xyzw]{1,4})?/gi );
				
				if ( !regs || regs.length != opFound.numRegister )
				{
					this._error = "this.error: wrong number of operands. found "+regs.length+" but expected "+opFound.numRegister+".";
					break;					
				}
				
				var badreg:boolean	= false;
				var pad:number		= 64 + 64 + 32;
				var regLength:number	= regs.length;
				
				for ( var j:number = 0; j < regLength; j++ )
				{
					var isRelative:boolean = false;
					var relreg:Array = regs[ j ].match( /\[.*\]/ig );
					if ( relreg && relreg.length > 0 )
					{
						regs[ j ] = regs[ j ].replace( relreg[ 0 ], "0" );
						
						if ( this.verbose )
							trace( "IS REL" );
						isRelative = true;
					}
					
					var res:Array = regs[j].match( /^\b[A-Za-z]{1,2}/ig );
					if ( !res ) 
					{
						this._error = "this.error: could not parse operand "+j+" ("+regs[j]+").";
						badreg = true;
						break;
					}
					var regFound:Register = REGMAP[ res[ 0 ] ];
					
					// if debug is enabled, output the registers
					if ( this.debugEnabled )
						trace( regFound );
					
					if ( regFound == null )
					{
						this._error = "this.error: could not find register this.name for operand "+j+" ("+regs[j]+").";
						badreg = true;
						break;
					}
					
					if ( isFrag )
					{
						if ( !( regFound.flags & REG_FRAG ) )
						{
							this._error = "this.error: register operand "+j+" ("+regs[j]+") only allowed in vertex programs.";
							badreg = true;
							break;
						}
						if ( isRelative )
						{
							this._error = "this.error: register operand "+j+" ("+regs[j]+") relative adressing not allowed in fragment programs.";
							badreg = true;
							break;
						}			
					}
					else
					{
						if ( !( regFound.flags & REG_VERT ) )
						{
							this._error = "this.error: register operand "+j+" ("+regs[j]+") only allowed in fragment programs.";
							badreg = true;
							break;
						}
					}
					
					regs[j] = regs[j].slice( regs[j].search( regFound.name ) + regFound.name.length );
					//trace( "REGNUM: " +regs[j] );
					var idxmatch:Array = isRelative ? relreg[0].match( /\d+/ ) : regs[j].match( /\d+/ );
					var regidx:number = 0;
					
					if ( idxmatch )
						regidx = number( idxmatch[0] );
					
					if ( regFound.range < regidx )
					{
						this._error = "this.error: register operand "+j+" ("+regs[j]+") index exceeds limit of "+(regFound.range+1)+".";
						badreg = true;
						break;
					}
					
					var regmask:number		= 0;
					var maskmatch:Array		= regs[j].match( /(\.[xyzw]{1,4})/ );
					var isDest:boolean		= ( j == 0 && !( opFound.flags & OP_NO_DEST ) );
					var isSampler:boolean	= ( j == 2 && ( opFound.flags & OP_SPECIAL_TEX ) );
					var reltype:number		= 0;
					var relsel:number			= 0;
					var reloffset:number		= 0;
					
					if ( isDest && isRelative )
					{
						this._error = "this.error: relative can not be destination";	
						badreg = true; 
						break;								
					}
					
					if ( maskmatch )
					{
						regmask = 0;
						var cv:number; 
						var maskLength:number = maskmatch[0].length;
						for ( var k:number = 1; k < maskLength; k++ )
						{
							cv = maskmatch[0].charCodeAt(k) - "x".charCodeAt(0);
							if ( cv > 2 )
								cv = 3;
							if ( isDest )
								regmask |= 1 << cv;
							else
								regmask |= cv << ( ( k - 1 ) << 1 );
						}
						if ( !isDest )
							for ( ; k <= 4; k++ )
								regmask |= cv << ( ( k - 1 ) << 1 ); // repeat last								
					}
					else
					{
						regmask = isDest ? 0xf : 0xe4; // id swizzle or this.mask						
					}
					
					if ( isRelative )
					{
						var relname:Array = relreg[0].match( /[A-Za-z]{1,2}/ig );						
						var regFoundRel:Register = REGMAP[ relname[0]];						
						if ( regFoundRel == null )
						{ 
							this._error = "this.error: bad index register"; 
							badreg = true; 
							break;
						}
						reltype = regFoundRel.emitCode;
						var selmatch:Array = relreg[0].match( /(\.[xyzw]{1,1})/ );						
						if ( selmatch.length==0 )
						{
							this._error = "this.error: bad index register select"; 
							badreg = true; 
							break;						
						}
						relsel = selmatch[0].charCodeAt(1) - "x".charCodeAt(0);
						if ( relsel > 2 )
							relsel = 3; 
						var relofs:Array = relreg[0].match( /\+\d{1,3}/ig );
						if ( relofs.length > 0 ) 
							reloffset = relofs[0]; 						
						if ( reloffset < 0 || reloffset > 255 )
						{
							this._error = "this.error: index offset "+reloffset+" out of bounds. [0..255]"; 
							badreg = true; 
							break;							
						}
						if ( this.verbose )
							trace( "RELATIVE: type="+reltype+"=="+relname[0]+" sel="+relsel+"=="+selmatch[0]+" idx="+regidx+" offset="+reloffset ); 
					}
					
					if ( this.verbose )
						trace( "  emit argcode="+regFound+"["+regidx+"]["+regmask+"]" );
					if ( isDest )
					{												
						this.agalcode.writeShort( regidx );
						this.agalcode.writeByte( regmask );
						this.agalcode.writeByte( regFound.emitCode );
						pad -= 32; 
					} else
					{
						if ( isSampler )
						{
							if ( this.verbose )
								trace( "  emit sampler" );
							var samplerbits:number = 5; // type 5 
							var optsLength:number = opts == null ? 0 : opts.length;
							var bias:number = 0; 
							for ( k = 0; k<optsLength; k++ )
							{
								if ( this.verbose )
									trace( "    opt: "+opts[k] );
								var optfound:Sampler = SAMPLEMAP [opts[k]];
								if ( optfound == null )
								{
									// todo check that it's a number...
									//trace( "Warning, unknown sampler option: "+opts[k] );
									bias = number(opts[k]); 
									if ( this.verbose )
										trace( "    bias: " + bias );																	
								}
								else
								{
									if ( optfound.flag != SAMPLER_SPECIAL_SHIFT )
										samplerbits &= ~( 0xf << optfound.flag );										
									samplerbits |= number( optfound.mask ) << number( optfound.flag );
								}
							}
							this.agalcode.writeShort( regidx );
							this.agalcode.writeByte(number(bias*8.0));
							this.agalcode.writeByte(0);							
							this.agalcode.writeUnsignedInt( samplerbits );
							
							if ( this.verbose )
								trace( "    bits: " + ( samplerbits - 5 ) );
							pad -= 64;
						}
						else
						{
							if ( j == 0 )
							{
								this.agalcode.writeUnsignedInt( 0 );
								pad -= 32;
							}
							this.agalcode.writeShort( regidx );
							this.agalcode.writeByte( reloffset );
							this.agalcode.writeByte( regmask );
							this.agalcode.writeByte( regFound.emitCode );
							this.agalcode.writeByte( reltype );
							this.agalcode.writeShort( isRelative ? ( relsel | ( 1 << 15 ) ) : 0 );
							
							pad -= 64;
						}
					}
				}
				
				// pad unused regs
				for ( j = 0; j < pad; j += 8 ) 
					this.agalcode.writeByte( 0 );
				
				if ( badreg )
					break;
			}
			
			if ( this._error != "" )
			{
				this._error += "\n  at line " + i + " " + lines[i];
				this.agalcode.length = 0;
				trace( this._error );
			}
			
			// trace the bytecode bytes if debugging is enabled
			if ( this.debugEnabled )
			{
				var dbgLine:string = "generated bytecode:";
				var agalLength:number = this.agalcode.length;
				for ( var index:number = 0; index < agalLength; index++ )
				{
					if ( !( index % 16 ) )
						dbgLine += "\n";
					if ( !( index % 4 ) )
						dbgLine += " ";
					
					var byteStr:string = this.agalcode[ index ].toString( 16 );
					if ( byteStr.length < 2 )
						byteStr = "0" + byteStr;
					
					dbgLine += byteStr;
				}
				trace( dbgLine );
			}
			
			if ( this.verbose )
				trace( "AGALMiniAssembler.assemble time: " + ( ( getTimer() - start ) / 1000 ) + "s" );
			
			return this.agalcode;
		}
		
		private initregmap ( version:number, ignorelimits:boolean )  {
			// version changes limits				
			REGMAP[ VA ]	= new Register( VA,	"vertex attribute",		0x0,	ignorelimits?1024:7,						REG_VERT | REG_READ );
			REGMAP[ VC ]	= new Register( VC,	"vertex constant",		0x1,	ignorelimits?1024:(version==1?127:250),		REG_VERT | REG_READ );
			REGMAP[ VT ]	= new Register( VT,	"vertex temporary",		0x2,	ignorelimits?1024:(version==1?7:27),		REG_VERT | REG_WRITE | REG_READ );
			REGMAP[ VO ]	= new Register( VO,	"vertex output",		0x3,	ignorelimits?1024:0,						REG_VERT | REG_WRITE );
			REGMAP[ VI ]	= new Register( VI,	"varying",				0x4,	ignorelimits?1024:(version==1?7:11),		REG_VERT | REG_FRAG | REG_READ | REG_WRITE );			
			REGMAP[ FC ]	= new Register( FC,	"fragment constant",	0x1,	ignorelimits?1024:(version==1?27:63),		REG_FRAG | REG_READ );
			REGMAP[ FT ]	= new Register( FT,	"fragment temporary",	0x2,	ignorelimits?1024:(version==1?7:27),		REG_FRAG | REG_WRITE | REG_READ );
			REGMAP[ FS ]	= new Register( FS,	"texture sampler",		0x5,	ignorelimits?1024:7,						REG_FRAG | REG_READ );
			REGMAP[ FO ]	= new Register( FO,	"fragment output",		0x3,	ignorelimits?1024:(version==1?0:3),			REG_FRAG | REG_WRITE );				
			REGMAP[ FD ]	= new Register( FD,	"fragment depth output",0x6,	ignorelimits?1024:(version==1?-1:0),		REG_FRAG | REG_WRITE );
			
			// aliases
			REGMAP[ "op" ]	= REGMAP[ VO ];
			REGMAP[ "i" ]	= REGMAP[ VI ];
			REGMAP[ "v" ]	= REGMAP[ VI ];
			REGMAP[ "oc" ]	= REGMAP[ FO ];
			REGMAP[ "od" ]	= REGMAP[ FD ];					
			REGMAP[ "fi" ]	= REGMAP[ VI ]; 
		}
		
		static private init()
		{
			initialized = true;
			
			// Fill the dictionaries with opcodes and registers
			OPMAP[ MOV ] = new OpCode( MOV, 2, 0x00, 0 );
			OPMAP[ ADD ] = new OpCode( ADD, 3, 0x01, 0 );
			OPMAP[ SUB ] = new OpCode( SUB, 3, 0x02, 0 );
			OPMAP[ MUL ] = new OpCode( MUL, 3, 0x03, 0 );
			OPMAP[ DIV ] = new OpCode( DIV, 3, 0x04, 0 );
			OPMAP[ RCP ] = new OpCode( RCP, 2, 0x05, 0 );					
			OPMAP[ MIN ] = new OpCode( MIN, 3, 0x06, 0 );
			OPMAP[ MAX ] = new OpCode( MAX, 3, 0x07, 0 );
			OPMAP[ FRC ] = new OpCode( FRC, 2, 0x08, 0 );			
			OPMAP[ SQT ] = new OpCode( SQT, 2, 0x09, 0 );
			OPMAP[ RSQ ] = new OpCode( RSQ, 2, 0x0a, 0 );
			OPMAP[ POW ] = new OpCode( POW, 3, 0x0b, 0 );
			OPMAP[ LOG ] = new OpCode( LOG, 2, 0x0c, 0 );
			OPMAP[ EXP ] = new OpCode( EXP, 2, 0x0d, 0 );
			OPMAP[ NRM ] = new OpCode( NRM, 2, 0x0e, 0 );
			OPMAP[ SIN ] = new OpCode( SIN, 2, 0x0f, 0 );
			OPMAP[ COS ] = new OpCode( COS, 2, 0x10, 0 );
			OPMAP[ CRS ] = new OpCode( CRS, 3, 0x11, 0 );
			OPMAP[ DP3 ] = new OpCode( DP3, 3, 0x12, 0 );
			OPMAP[ DP4 ] = new OpCode( DP4, 3, 0x13, 0 );					
			OPMAP[ ABS ] = new OpCode( ABS, 2, 0x14, 0 );
			OPMAP[ NEG ] = new OpCode( NEG, 2, 0x15, 0 );
			OPMAP[ SAT ] = new OpCode( SAT, 2, 0x16, 0 );
			OPMAP[ M33 ] = new OpCode( M33, 3, 0x17, OP_SPECIAL_MATRIX );
			OPMAP[ M44 ] = new OpCode( M44, 3, 0x18, OP_SPECIAL_MATRIX );
			OPMAP[ M34 ] = new OpCode( M34, 3, 0x19, OP_SPECIAL_MATRIX );		
			OPMAP[ DDX ] = new OpCode( DDX, 2, 0x1a, OP_VERSION2 | OP_FRAG_ONLY );
			OPMAP[ DDY ] = new OpCode( DDY, 2, 0x1b, OP_VERSION2 | OP_FRAG_ONLY );			
			OPMAP[ IFE ] = new OpCode( IFE, 2, 0x1c, OP_NO_DEST | OP_VERSION2 | OP_INCNEST | OP_SCALAR );
			OPMAP[ INE ] = new OpCode( INE, 2, 0x1d, OP_NO_DEST | OP_VERSION2 | OP_INCNEST | OP_SCALAR );
			OPMAP[ IFG ] = new OpCode( IFG, 2, 0x1e, OP_NO_DEST | OP_VERSION2 | OP_INCNEST | OP_SCALAR );			
			OPMAP[ IFL ] = new OpCode( IFL, 2, 0x1f, OP_NO_DEST | OP_VERSION2 | OP_INCNEST | OP_SCALAR );
			OPMAP[ ELS ] = new OpCode( ELS, 0, 0x20, OP_NO_DEST | OP_VERSION2 | OP_INCNEST | OP_DECNEST | OP_SCALAR );
			OPMAP[ EIF ] = new OpCode( EIF, 0, 0x21, OP_NO_DEST | OP_VERSION2 | OP_DECNEST | OP_SCALAR );
			// space			
			OPMAP[ TED ] = new OpCode( TED, 3, 0x26, OP_FRAG_ONLY | OP_SPECIAL_TEX | OP_VERSION2);			
			OPMAP[ KIL ] = new OpCode( KIL, 1, 0x27, OP_NO_DEST | OP_FRAG_ONLY );
			OPMAP[ TEX ] = new OpCode( TEX, 3, 0x28, OP_FRAG_ONLY | OP_SPECIAL_TEX );
			OPMAP[ SGE ] = new OpCode( SGE, 3, 0x29, 0 );
			OPMAP[ SLT ] = new OpCode( SLT, 3, 0x2a, 0 );
			OPMAP[ SGN ] = new OpCode( SGN, 2, 0x2b, 0 );
			OPMAP[ SEQ ] = new OpCode( SEQ, 3, 0x2c, 0 );
			OPMAP[ SNE ] = new OpCode( SNE, 3, 0x2d, 0 );			
			
			
			SAMPLEMAP[ RGBA ]		= new Sampler( RGBA,		SAMPLER_TYPE_SHIFT,			0 );
			SAMPLEMAP[ DXT1 ]		= new Sampler( DXT1,		SAMPLER_TYPE_SHIFT,			1 );
			SAMPLEMAP[ DXT5 ]		= new Sampler( DXT5,		SAMPLER_TYPE_SHIFT,			2 );
			SAMPLEMAP[ VIDEO ]		= new Sampler( VIDEO,		SAMPLER_TYPE_SHIFT,			3 );
			SAMPLEMAP[ D2 ]			= new Sampler( D2,			SAMPLER_DIM_SHIFT,			0 );
			SAMPLEMAP[ D3 ]			= new Sampler( D3,			SAMPLER_DIM_SHIFT,			2 );
			SAMPLEMAP[ CUBE ]		= new Sampler( CUBE,		SAMPLER_DIM_SHIFT,			1 );
			SAMPLEMAP[ MIPNEAREST ]	= new Sampler( MIPNEAREST,	SAMPLER_MIPMAP_SHIFT,		1 );
			SAMPLEMAP[ MIPLINEAR ]	= new Sampler( MIPLINEAR,	SAMPLER_MIPMAP_SHIFT,		2 );
			SAMPLEMAP[ MIPNONE ]	= new Sampler( MIPNONE,		SAMPLER_MIPMAP_SHIFT,		0 );
			SAMPLEMAP[ NOMIP ]		= new Sampler( NOMIP,		SAMPLER_MIPMAP_SHIFT,		0 );
			SAMPLEMAP[ NEAREST ]	= new Sampler( NEAREST,		SAMPLER_FILTER_SHIFT,		0 );
			SAMPLEMAP[ LINEAR ]		= new Sampler( LINEAR,		SAMPLER_FILTER_SHIFT,		1 );
			SAMPLEMAP[ CENTROID ]	= new Sampler( CENTROID,	SAMPLER_SPECIAL_SHIFT,		1 << 0 );
			SAMPLEMAP[ SINGLE ]		= new Sampler( SINGLE,		SAMPLER_SPECIAL_SHIFT,		1 << 1 );
			SAMPLEMAP[ IGNORESAMPLER ]	= new Sampler( IGNORESAMPLER,		SAMPLER_SPECIAL_SHIFT,		1 << 2 );
			SAMPLEMAP[ REPEAT ]		= new Sampler( REPEAT,		SAMPLER_REPEAT_SHIFT,		1 );
			SAMPLEMAP[ WRAP ]		= new Sampler( WRAP,		SAMPLER_REPEAT_SHIFT,		1 );
			SAMPLEMAP[ CLAMP ]		= new Sampler( CLAMP,		SAMPLER_REPEAT_SHIFT,		0 );
		}
		
		// ======================================================================
		//	Constants
		// ----------------------------------------------------------------------
		private static OPMAP:Dictionary					= new Dictionary();
		private static REGMAP:Dictionary					= new Dictionary();
		private static SAMPLEMAP:Dictionary				= new Dictionary();
		
		private static MAX_NESTING:number					= 4;
		private static MAX_OPCODES:number					= 2048;
		
		private static FRAGMENT:string					= "fragment";
		private static VERTEX:string						= "vertex";
		
		// masks and shifts
		private static SAMPLER_TYPE_SHIFT:number			= 8;
		private static SAMPLER_DIM_SHIFT:number				= 12;
		private static SAMPLER_SPECIAL_SHIFT:number			= 16;
		private static SAMPLER_REPEAT_SHIFT:number			= 20;
		private static SAMPLER_MIPMAP_SHIFT:number			= 24;
		private static SAMPLER_FILTER_SHIFT:number			= 28;
		
		// regmap flags
		private static REG_WRITE:number						= 0x1;
		private static REG_READ:number						= 0x2;
		private static REG_FRAG:number						= 0x20;
		private static REG_VERT:number						= 0x40;
		
		// opmap flags
		private static OP_SCALAR:number						= 0x1;
		private static OP_SPECIAL_TEX:number				= 0x8;
		private static OP_SPECIAL_MATRIX:number				= 0x10;
		private static OP_FRAG_ONLY:number					= 0x20;
		private static OP_VERT_ONLY:number					= 0x40;
		private static OP_NO_DEST:number					= 0x80;
		private static OP_VERSION2:number 					= 0x100;		
		private static OP_INCNEST:number 					= 0x200;
		private static OP_DECNEST:number					= 0x400;
		
		// opcodes
		private static MOV:string							= "mov";
		private static ADD:string							= "add";
		private static SUB:string							= "sub";
		private static MUL:string							= "mul";
		private static DIV:string							= "div";
		private static RCP:string							= "rcp";
		private static MIN:string							= "min";
		private static MAX:string							= "max";
		private static FRC:string							= "frc";
		private static SQT:string							= "sqt";
		private static RSQ:string							= "rsq";
		private static POW:string							= "pow";
		private static LOG:string							= "log";
		private static EXP:string							= "exp";
		private static NRM:string							= "nrm";
		private static SIN:string							= "sin";
		private static COS:string							= "cos";
		private static CRS:string							= "crs";
		private static DP3:string							= "dp3";
		private static DP4:string							= "dp4";
		private static ABS:string							= "abs";
		private static NEG:string							= "neg";
		private static SAT:string							= "sat";
		private static M33:string							= "m33";
		private static M44:string							= "m44";
		private static M34:string							= "m34";
		private static DDX:string							= "ddx";
		private static DDY:string							= "ddy";		
		private static IFE:string							= "ife";
		private static INE:string							= "ine";
		private static IFG:string							= "ifg";
		private static IFL:string							= "ifl";
		private static ELS:string							= "els";
		private static EIF:string							= "eif";
		private static TED:string							= "ted";
		private static KIL:string							= "kil";
		private static TEX:string							= "tex";
		private static SGE:string							= "sge";
		private static SLT:string							= "slt";
		private static SGN:string							= "sgn";
		private static SEQ:string							= "seq";
		private static SNE:string							= "sne";		
		
		// registers
		private static VA:string							= "va";
		private static VC:string							= "vc";
		private static VT:string							= "vt";
		private static VO:string							= "vo";
		private static VI:string							= "vi";
		private static FC:string							= "fc";
		private static FT:string							= "ft";
		private static FS:string							= "fs";
		private static FO:string							= "fo";			
		private static FD:string							= "fd"; 
		
		// samplers
		private static D2:string							= "2d";
		private static D3:string							= "3d";
		private static CUBE:string						= "cube";
		private static MIPNEAREST:string					= "mipnearest";
		private static MIPLINEAR:string					= "miplinear";
		private static MIPNONE:string						= "mipnone";
		private static NOMIP:string						= "nomip";
		private static NEAREST:string						= "nearest";
		private static LINEAR:string						= "linear";
		private static CENTROID:string					= "centroid";
		private static SINGLE:string						= "single";
		private static IGNORESAMPLER:string				= "ignoresampler";
		private static REPEAT:string						= "repeat";
		private static WRAP:string						= "wrap";
		private static CLAMP:string						= "clamp";
		private static RGBA:string						= "rgba";
		private static DXT1:string						= "dxt1";
		private static DXT5:string						= "dxt5";
		private static VIDEO:string						= "video";
	}
}

// ================================================================================
//	Helper Classes
// --------------------------------------------------------------------------------
{
	// ===========================================================================
	//	Class
	// ---------------------------------------------------------------------------
	class OpCode
	{		
		// ======================================================================
		//	Properties
		// ----------------------------------------------------------------------
		private _emitCode:number;
		private _flags:number;
		private _name:string;
		private _numRegister:number;
		
		// ======================================================================
		//	Getters
		// ----------------------------------------------------------------------
		public get emitCode():number		{ return _emitCode; }
		public get flags():number		{ return _flags; }
		public get name():string		{ return _name; }
		public get numRegister():number	{ return _numRegister; }
		
		// ======================================================================
		//	Constructor
		// ----------------------------------------------------------------------
		public OpCode( name:string, numRegister:number, emitCode:number, flags:number)
		{
			this._name = name;
			this._numRegister = numRegister;
			this._emitCode = emitCode;
			this._flags = flags;
		}		
		
		// ======================================================================
		//	Methods
		// ----------------------------------------------------------------------
		public toString():string
		{
			return "[OpCode this.name=\""+this._name+"\", this.numRegister="+this._numRegister+", this.emitCode="+this._emitCode+", this.flags="+this._flags+"]";
		}
	}
	
	// ===========================================================================
	//	Class
	// ---------------------------------------------------------------------------
	class Register
	{
		// ======================================================================
		//	Properties
		// ----------------------------------------------------------------------
		private _emitCode:number;
		private _name:string;
		private _longName:string;
		private _flags:number;
		private _range:number;
		
		// ======================================================================
		//	Getters
		// ----------------------------------------------------------------------
		public get emitCode():number		{ return _emitCode; }
		public get longName():string	{ return _longName; }
		public get name():string		{ return _name; }
		public get flags():number		{ return _flags; }
		public get range():number		{ return _range; }
		
		// ======================================================================
		//	Constructor
		// ----------------------------------------------------------------------
		public Register( name:string, longName:string, emitCode:number, range:number, flags:number)
		{
			this._name = name;
			this._longName = longName;
			this._emitCode = emitCode;
			this._range = range;
			this._flags = flags;
		}
		
		// ======================================================================
		//	Methods
		// ----------------------------------------------------------------------
		public toString():string
		{
			return "[Register this.name=\""+this._name+"\", this.longName=\""+this._longName+"\", this.emitCode="+this._emitCode+", this.range="+this._range+", this.flags="+ this._flags+"]";
		}
	}
	
	// ===========================================================================
	//	Class
	// ---------------------------------------------------------------------------
	class Sampler
	{
		// ======================================================================
		//	Properties
		// ----------------------------------------------------------------------
		private _flag:number;
		private _mask:number;
		private _name:string;
		
		// ======================================================================
		//	Getters
		// ----------------------------------------------------------------------
		public get flag():number		{ return _flag; }
		public get mask():number		{ return _mask; }
		public get name():string	{ return _name; }
		
		// ======================================================================
		//	Constructor
		// ----------------------------------------------------------------------
		public Sampler( name:string, flag:number, mask:number )
		{
			this._name = name;
			this._flag = flag;
			this._mask = mask;
		}
		
		// ======================================================================
		//	Methods
		// ----------------------------------------------------------------------
		public toString():string
		{
			return "[Sampler this.name=\""+this._name+"\", this.flag=\""+this._flag+"\", this.mask="+this.mask+"]";
		}
	}
}