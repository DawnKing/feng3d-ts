module feng3d
{
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	

	

	/**
	 * <p>Stats monitor for Away3D or general use in any project. The widget was designed to
	 * display all the necessary data in ways that are easily readable, while maintaining a
	 * tiny size.</p>
	 *
	 * <p>The following data is displayed by the widget, either graphically, through
	 * text, or both.</p>
	 * <ul>
	 *   <li>Current frame rate in FPS (white in graph/bar)</li>
	 *   <li>SWF frame rate (Stage.frameRate)</li>
	 *   <li>Average FPS (blue in graph/bar)</li>
	 *   <li>Min/Max FPS (only on frame rate bar in minimized mode)</li>
	 *   <li>Current RAM usage (pink in graph)</li>
	 *   <li>Maximum RAM usage</li>
	 *   <li>number of polygons in scene</li>
	 *   <li>number of polygons last rendered (yellow in graph)</li>
	 * </ul>
	 *
	 * <p>There are two display modes; standard and minimized, which are alternated by clicking
	 * the button in the upper right corner, at runtime. The widget can also be configured to
	 * start in minimized mode by setting the relevant constructor parameter.</p>
	 *
	 * <p>All data can be reset at any time, by clicking the lower part of the widget (where
	 * the RAM and POLY counters are located. The average FPS can be reset separately by
	 * clicking it's ²displayed value. Furthermore, the stage frame rate can be increased or
	 * decreased by clicking the upper and lower parts of the graph, respectively. Clicking close
	 * to the center will increment in small values, and further away will increase the steps.
	 * The graph itself is only visible in standard (as opposed to minimized) display mode.</p>
	 *
	 * <p>The average FPS is calculated using one of two methods, configurable via constructor
	 * parameters. By setting the meanDataLength to a non-zero value, the number of recorded
	 * frame rate values on which the average is based can be configured. This has a tiny
	 * impact on CPU usage, which is the reason why the default number is zero, denoting that
	 * the average is calculated from a running sum since the widget was last reset.</p>
	 */
	export class AwayStats extends Sprite
	{
		private _views:View3D[];
		private _timer:Timer;
		private _last_frame_timestamp:number;

		private _fps:number;
		private _ram:number;
		private _max_ram:number;
		private _min_fps:number;
		private _avg_fps:number;
		private _max_fps:number;
		private _tfaces:number;
		private _rfaces:number;

		private _num_frames:number;
		private _fps_sum:number;

		private _top_bar:Sprite;
		private _btm_bar:Sprite;
		private _btm_bar_hit:Sprite;

		private _data_format:TextFormat;
		private _label_format:TextFormat;

		private _fps_bar:Shape;
		private _afps_bar:Shape;
		private _lfps_bar:Shape;
		private _hfps_bar:Shape;
		private _diagram:Sprite;
		private _dia_bmp:BitmapData;

		private _mem_points:Array;
		private _mem_graph:Shape;
		private _updates:number;

		private _min_max_btn:Sprite;

		private _fps_tf:TextField;
		private _afps_tf:TextField;
		private _ram_tf:TextField;
		private _poly_tf:TextField;
		private _swhw_tf:TextField;

		private _drag_dx:number;
		private _drag_dy:number;
		private _dragging:boolean;

		private _mean_data:Array;
		private _mean_data_length:number;

		private _enable_reset:boolean;
		private _enable_mod_fr:boolean;
		private _transparent:boolean;
		private _minimized:boolean;
		private _showing_driv_info:boolean;

		private static _WIDTH:number = 125;
		private static _MAX_HEIGHT:number = 85;
		private static _MIN_HEIGHT:number = 51;
		private static _UPPER_Y:number = -1;
		private static _MID_Y:number = 9;
		private static _LOWER_Y:number = 19;
		private static _DIAG_HEIGHT:number = _MAX_HEIGHT - 50;
		private static _BOTTOM_BAR_HEIGHT:number = 31;

		private static _POLY_COL:number = 0xffcc00;
		private static _MEM_COL:number = 0xff00cc;

		// Singleton instance reference
		private static _INSTANCE:AwayStats;

		/**
		 * <p>Create an Away3D stats widget. The widget can be added to the stage
		 * and positioned like any other display object. Once on the stage, you
		 * can drag the widget to re-position it at runtime.</p>
		 *
		 * <p>If you pass a View3D instance, the widget will be able to display
		 * the total number of faces in your scene, and the amount of faces that
		 * were rendered during the last render() call. Views can also be registered
		 * after construction using the registerView() method. Omit the view
		 * constructor parameter to disable this feature altogether.</p>
		 *
		 * @param view A reference to your Away3D view. This is required if you
		 * want the stats widget to display polycounts.
		 *
		 * @param minimized Defines whether the widget should start up in minimized
		 * mode. By default, it is shown in full-size mode on launch.
		 *
		 * @param transparent Defines whether to omit the background plate and print
		 * statistics directly on top of the underlying stage.
		 *
		 * @param meanDataLength The number of frames on which to base the average
		 * frame rate calculation. The default value of zero indicates that all
		 * frames since the last reset will be used.
		 *
		 * @param enableClickToReset Enables interaction allowing you to reset all
		 * counters by clicking the bottom bar of the widget. When activated, you
		 * can also click the average frame rate trace-out to reset just that one
		 * value.
		 *
		 * @param enableModifyFramerate When enabled, allows you to click the upper
		 * and lower parts of the graph area to increase and decrease SWF frame rate
		 * respectively.
		 */
		constructor(view3d:View3D = null, minimized:boolean = false, transparent:boolean = false, meanDataLength:number = 0, enableClickToReset:boolean = true, enableModifyFrameRate:boolean = true)
		{
			super();

			this._minimized = minimized;
			this._transparent = transparent;
			this._enable_reset = enableClickToReset;
			this._enable_mod_fr = enableModifyFrameRate;
			this._mean_data_length = meanDataLength;

			this._views = new View3D[]();
			if (view3d)
				this._views.push(view3d);

			// Store instance for singleton access. Singleton status
			// is not enforced, since the widget will work anyway.
			if (_INSTANCE)
				trace('Creating several statistics windows in one project. Is this intentional?');
			_INSTANCE = this;

			this._fps = 0;
			this._num_frames = 0;
			this._avg_fps = 0;
			this._ram = 0;
			this._max_ram = 0;
			this._tfaces = 0;
			this._rfaces = 0;

			this._init();
		}

		public get max_ram():number
		{
			return _max_ram;
		}

		public get ram():number
		{
			return _ram;
		}

		public get avg_fps():number
		{
			return _avg_fps;
		}

		public get max_fps():number
		{
			return _max_fps;
		}

		public get fps():number
		{
			return _fps;
		}

		private _init()
		{
			this._initMisc();
			this._initTopBar();
			this._initBottomBar();
			this._initDiagrams();
			this._initInteraction();

			this.reset();
			this._redrawWindow();

			this.addEventListener(Event.ADDED_TO_STAGE, this._onAddedToStage);
			this.addEventListener(Event.REMOVED_FROM_STAGE, this._onRemovedFromStage);
		}

		/**
		 * Holds a reference to the stats widget (or if several have been created
		 * during session, the one that was last instantiated.) Allows you to set
		 * properties and register views from anywhere in your code.
		 */
		public static get instance():AwayStats
		{
			return _INSTANCE ? _INSTANCE : _INSTANCE = new AwayStats();
		}

		/**
		 * Add a view to the list of those that are taken into account when
		 * calculating on-screen and total poly counts. Use this method when the
		 * stats widget is not instantiated in the same place as where you create
		 * your view, or when using several views, or when views are created and
		 * destroyed dynamically at runtime.
		 */
		public registerView(view3d:View3D)
		{
			if (view3d && this._views.indexOf(view3d) < 0)
				this._views.push(view3d);
		}

		/**
		 * Remove a view from the list of those that are taken into account when
		 * calculating on-screen and total poly counts. If the supplied view is
		 * the only one known to the stats widget, calling this will leave the
		 * list empty, disabling poly count statistics altogether.
		 */
		public unregisterView(view3d:View3D)
		{
			if (view3d)
			{
				var idx:number = this._views.indexOf(view3d);
				if (idx >= 0)
					this._views.splice(idx, 1);
			}
		}

		private _initMisc()
		{
			this._timer = new Timer(200, 0);
			this._timer.addEventListener('timer', this._onTimer);

			this._label_format = new TextFormat('_sans', 9, 0xffffff, true);
			this._data_format = new TextFormat('_sans', 9, 0xffffff, false);

			if (this._mean_data_length > 0)
			{
				var i:number;

				this._mean_data = [];
				for (i = 0; i < this._mean_data_length; i++)
					this._mean_data[i] = 0.0;
			}
		}

		/**
		 * @private
		 * Draw logo and create title textfield.
		 */
		private _initTopBar()
		{
			var logo:Shape;
			var markers:Shape;
			//var logo_tf : TextField;
			var fps_label_tf:TextField;
			var afps_label_tf:TextField;

			this._top_bar = new Sprite;
			this._top_bar.graphics.beginFill(0, 0);
			this._top_bar.graphics.drawRect(0, 0, _WIDTH, 20);
			this.addChild(this._top_bar);

			logo = new Shape;
			logo.x = 9;
			logo.y = 7.5;
			logo.scaleX = 0.6;
			logo.scaleY = 0.6;
			logo.graphics.beginFill(0xffffff, 1);

			// Left
			logo.graphics.moveTo(-0.5, -7);
			logo.graphics.curveTo(-0.5, -7.7, -1, -7);
			logo.graphics.lineTo(-9, 5);
			logo.graphics.curveTo(-9.3, 5.5, -8, 5);
			logo.graphics.curveTo(-1, 1, -0.5, -7);

			// Right
			logo.graphics.moveTo(0.5, -7);
			logo.graphics.curveTo(0.5, -7.7, 1, -7);
			logo.graphics.lineTo(9, 5);
			logo.graphics.curveTo(9.3, 5.5, 8, 5);
			logo.graphics.curveTo(1, 1, 0.5, -7);

			// Bottom
			logo.graphics.moveTo(-8, 7);
			logo.graphics.curveTo(-8.3, 6.7, -7.5, 6.3);
			logo.graphics.curveTo(0, 2, 7.5, 6.3);
			logo.graphics.curveTo(8.3, 6.7, 8, 7);
			logo.graphics.lineTo(-8, 7);
			this._top_bar.addChild(logo);

			// Color markers 
			markers = new Shape;
			markers.graphics.beginFill(0xffffff);
			markers.graphics.drawRect(20, 7, 4, 4);
			markers.graphics.beginFill(0x3388dd);
			markers.graphics.drawRect(77, 7, 4, 4);
			this._top_bar.addChild(markers);

			// CURRENT FPS
			fps_label_tf = new TextField();
			fps_label_tf.defaultTextFormat = this._label_format;
			fps_label_tf.autoSize = TextFieldAutoSize.LEFT;
			fps_label_tf.text = 'FR:';
			fps_label_tf.x = 24;
			fps_label_tf.y = 2;
			fps_label_tf.selectable = false;
			this._top_bar.addChild(fps_label_tf);

			this._fps_tf = new TextField;
			this._fps_tf.defaultTextFormat = this._data_format;
			this._fps_tf.autoSize = TextFieldAutoSize.LEFT;
			this._fps_tf.x = fps_label_tf.x + 16;
			this._fps_tf.y = fps_label_tf.y;
			this._fps_tf.selectable = false;
			this._top_bar.addChild(this._fps_tf);

			// AVG FPS
			afps_label_tf = new TextField;
			afps_label_tf.defaultTextFormat = this._label_format;
			afps_label_tf.autoSize = TextFieldAutoSize.LEFT;
			afps_label_tf.text = 'A:';
			afps_label_tf.x = 81;
			afps_label_tf.y = 2;
			afps_label_tf.selectable = false;
			this._top_bar.addChild(afps_label_tf);

			this._afps_tf = new TextField;
			this._afps_tf.defaultTextFormat = this._data_format;
			this._afps_tf.autoSize = TextFieldAutoSize.LEFT;
			this._afps_tf.x = afps_label_tf.x + 12;
			this._afps_tf.y = afps_label_tf.y;
			this._afps_tf.selectable = false;
			this._top_bar.addChild(this._afps_tf);

			// Minimize / maximize button
			this._min_max_btn = new Sprite;
			this._min_max_btn.x = _WIDTH - 8;
			this._min_max_btn.y = 7;
			this._min_max_btn.graphics.beginFill(0, 0);
			this._min_max_btn.graphics.lineStyle(1, 0xefefef, 1, true);
			this._min_max_btn.graphics.drawRect(-4, -4, 8, 8);
			this._min_max_btn.graphics.moveTo(-3, 2);
			this._min_max_btn.graphics.lineTo(3, 2);
			this._min_max_btn.buttonMode = true;
			this._min_max_btn.addEventListener(MouseEvent.CLICK, this._onMinMaxBtnClick);
			this._top_bar.addChild(this._min_max_btn);
		}

		private _initBottomBar()
		{
			var markers:Shape;
			var ram_label_tf:TextField;
			var poly_label_tf:TextField;
			var swhw_label_tf:TextField;

			this._btm_bar = new Sprite();
			this._btm_bar.graphics.beginFill(0, 0.2);
			this._btm_bar.graphics.drawRect(0, 0, _WIDTH, _BOTTOM_BAR_HEIGHT);
			this.addChild(this._btm_bar);

			// Hit area for bottom bar (to avoid having textfields
			// affect interaction badly.)
			this._btm_bar_hit = new Sprite;
			this._btm_bar_hit.graphics.beginFill(0xffcc00, 0);
			this._btm_bar_hit.graphics.drawRect(0, 1, _WIDTH, _BOTTOM_BAR_HEIGHT - 1);
			this.addChild(this._btm_bar_hit);

			// Color markers
			markers = new Shape;
			markers.graphics.beginFill(_MEM_COL);
			markers.graphics.drawRect(5, 4, 4, 4);
			markers.graphics.beginFill(_POLY_COL);
			markers.graphics.drawRect(5, 14, 4, 4);
			this._btm_bar.addChild(markers);

			// CURRENT RAM
			ram_label_tf = new TextField;
			ram_label_tf.defaultTextFormat = this._label_format;
			ram_label_tf.autoSize = TextFieldAutoSize.LEFT;
			ram_label_tf.text = 'RAM:';
			ram_label_tf.x = 10;
			ram_label_tf.y = _UPPER_Y;
			ram_label_tf.selectable = false;
			ram_label_tf.mouseEnabled = false;
			this._btm_bar.addChild(ram_label_tf);

			this._ram_tf = new TextField;
			this._ram_tf.defaultTextFormat = this._data_format;
			this._ram_tf.autoSize = TextFieldAutoSize.LEFT;
			this._ram_tf.x = ram_label_tf.x + 31;
			this._ram_tf.y = ram_label_tf.y;
			this._ram_tf.selectable = false;
			this._ram_tf.mouseEnabled = false;
			this._btm_bar.addChild(this._ram_tf);

			// POLY COUNT
			poly_label_tf = new TextField;
			poly_label_tf.defaultTextFormat = this._label_format;
			poly_label_tf.autoSize = TextFieldAutoSize.LEFT;
			poly_label_tf.text = 'POLY:';
			poly_label_tf.x = 10;
			poly_label_tf.y = _MID_Y;
			poly_label_tf.selectable = false;
			poly_label_tf.mouseEnabled = false;
			this._btm_bar.addChild(poly_label_tf);

			this._poly_tf = new TextField;
			this._poly_tf.defaultTextFormat = this._data_format;
			this._poly_tf.autoSize = TextFieldAutoSize.LEFT;
			this._poly_tf.x = poly_label_tf.x + 31;
			this._poly_tf.y = poly_label_tf.y;
			this._poly_tf.selectable = false;
			this._poly_tf.mouseEnabled = false;
			this._btm_bar.addChild(this._poly_tf);

			// SOFTWARE RENDERER WARNING
			swhw_label_tf = new TextField;
			swhw_label_tf.defaultTextFormat = this._label_format;
			swhw_label_tf.autoSize = TextFieldAutoSize.LEFT;
			swhw_label_tf.text = 'DRIV:';
			swhw_label_tf.x = 10;
			swhw_label_tf.y = _LOWER_Y;
			swhw_label_tf.selectable = false;
			swhw_label_tf.mouseEnabled = false;
			this._btm_bar.addChild(swhw_label_tf);

			this._swhw_tf = new TextField;
			this._swhw_tf.defaultTextFormat = this._data_format;
			this._swhw_tf.autoSize = TextFieldAutoSize.LEFT;
			this._swhw_tf.x = swhw_label_tf.x + 31;
			this._swhw_tf.y = swhw_label_tf.y;
			this._swhw_tf.selectable = false;
			this._swhw_tf.mouseEnabled = false;
			this._btm_bar.addChild(this._swhw_tf);
		}

		private _initDiagrams()
		{

			this._dia_bmp = new BitmapData(_WIDTH, _DIAG_HEIGHT, true, 0);
			this._diagram = new Sprite;
			this._diagram.graphics.beginBitmapFill(this._dia_bmp);
			this._diagram.graphics.drawRect(0, 0, this._dia_bmp.width, this._dia_bmp.height);
			this._diagram.graphics.endFill();
			this._diagram.y = 17;
			this.addChild(this._diagram);

			this._diagram.graphics.lineStyle(1, 0xffffff, 0.03);
			this._diagram.graphics.moveTo(0, 0);
			this._diagram.graphics.lineTo(_WIDTH, 0);
			this._diagram.graphics.moveTo(0, Math.floor(this._dia_bmp.height / 2));
			this._diagram.graphics.lineTo(_WIDTH, Math.floor(this._dia_bmp.height / 2));

			// FRAME RATE BAR
			this._fps_bar = new Shape;
			this._fps_bar.graphics.beginFill(0xffffff);
			this._fps_bar.graphics.drawRect(0, 0, _WIDTH, 4);
			this._fps_bar.x = 0;
			this._fps_bar.y = 16;
			this.addChild(this._fps_bar);

			// AVERAGE FPS
			this._afps_bar = new Shape;
			this._afps_bar.graphics.lineStyle(1, 0x3388dd, 1, false, LineScaleMode.NORMAL, CapsStyle.SQUARE);
			this._afps_bar.graphics.lineTo(0, 4);
			this._afps_bar.y = this._fps_bar.y;
			this.addChild(this._afps_bar);

			// MINIMUM FPS
			this._lfps_bar = new Shape;
			this._lfps_bar.graphics.lineStyle(1, 0xff0000, 1, false, LineScaleMode.NORMAL, CapsStyle.SQUARE);
			this._lfps_bar.graphics.lineTo(0, 4);
			this._lfps_bar.y = this._fps_bar.y;
			this.addChild(this._lfps_bar);

			// MAXIMUM FPS
			this._hfps_bar = new Shape;
			this._hfps_bar.graphics.lineStyle(1, 0x00ff00, 1, false, LineScaleMode.NORMAL, CapsStyle.SQUARE);
			this._hfps_bar.graphics.lineTo(0, 4);
			this._hfps_bar.y = this._fps_bar.y;
			this.addChild(this._hfps_bar);

			this._mem_points = [];
			this._mem_graph = new Shape;
			this._mem_graph.y = this._diagram.y + this._diagram.height;
			this.addChildAt(this._mem_graph, 0);
		}

		private _initInteraction()
		{
			// Mouse down to drag on the title
			this._top_bar.addEventListener(MouseEvent.MOUSE_DOWN, this._onTopBarMouseDown);

			// Reset functionality
			if (this._enable_reset)
			{
				this._btm_bar.mouseEnabled = false;
				this._btm_bar_hit.addEventListener(MouseEvent.CLICK, this._onCountersClick_reset);
				this._afps_tf.addEventListener(MouseEvent.MOUSE_UP, this._onAverageFpsClick_reset, false, 1);
			}

			// Framerate increase/decrease by clicking on the diagram
			if (this._enable_mod_fr)
				this._diagram.addEventListener(MouseEvent.CLICK, this._onDiagramClick);
		}

		private _redrawWindow()
		{
			var plate_height:number;

			plate_height = this._minimized ? _MIN_HEIGHT : _MAX_HEIGHT;

			// Main plate
			if (!this._transparent)
			{
				this.graphics.clear();
				this.graphics.beginFill(0, 0.6);
				this.graphics.drawRect(0, 0, _WIDTH, plate_height);
			}

			// Minimize/maximize button
			this._min_max_btn.rotation = this._minimized ? 180 : 0;

			// Position counters
			this._btm_bar.y = plate_height - _BOTTOM_BAR_HEIGHT;
			this._btm_bar_hit.y = this._btm_bar.y;

			// Hide/show diagram for minimized/maximized view respectively
			this._diagram.visible = !this._minimized;
			this._mem_graph.visible = !this._minimized;
			this._fps_bar.visible = this._minimized;
			this._afps_bar.visible = this._minimized;
			this._lfps_bar.visible = this._minimized;
			this._hfps_bar.visible = this._minimized;

			// Redraw memory graph
			if (!this._minimized)
				this._redrawMemGraph();
		}

		private _redrawStats()
		{
			var dia_y:number;

			// Redraw counters
			this._fps_tf.text = this._fps.toString().concat('/', number(this.stage.frameRate));
			this._afps_tf.text = Math.round(this._avg_fps).toString();
			this._ram_tf.text = this._getRamString(this._ram).concat(' / ', this._getRamString(this._max_ram));

			// Move entire diagram
			this._dia_bmp.scroll(1, 0);

			// Only redraw polycount if there is a  view available
			// or they won't have been calculated properly
			if (this._views.length > 0)
			{
				//				this._poly_tf.text = this._rfaces.toString().concat(' / ', this._tfaces); // TODO: Total faces not yet available in 4.x
				this._poly_tf.text = this._rfaces + "";

				// Plot rendered faces
				dia_y = this._dia_bmp.height - Math.floor(this._rfaces / this._tfaces * this._dia_bmp.height);
				this._dia_bmp.setPixel32(1, dia_y, _POLY_COL + 0xff000000);
			}
			else
				this._poly_tf.text = 'n/a (no view)';

			// Show software (SW) or hardware (HW)
			if (!this._showing_driv_info)
			{
				if (this._views && this._views.length && this._views[0].stage3DProxy && this._views[0].stage3DProxy.context3D)
				{
					var di:string = this._views[0].stage3DProxy.context3D.driverInfo;
					this._swhw_tf.text = di.substr(0, di.indexOf(' '));
					this._showing_driv_info = true;
				}
				else
					this._swhw_tf.text = 'n/a (no view)';
			}

			// Plot current framerate
			dia_y = this._dia_bmp.height - Math.floor(this._fps / this.stage.frameRate * this._dia_bmp.height);
			this._dia_bmp.setPixel32(1, dia_y, 0xffffffff);

			// Plot average framerate
			dia_y = this._dia_bmp.height - Math.floor(this._avg_fps / this.stage.frameRate * this._dia_bmp.height);
			this._dia_bmp.setPixel32(1, dia_y, 0xff33bbff);

			// Redraw diagrams
			if (this._minimized)
			{
				this._fps_bar.scaleX = Math.min(1, this._fps / this.stage.frameRate);
				this._afps_bar.x = Math.min(1, this._avg_fps / this.stage.frameRate) * _WIDTH;
				this._lfps_bar.x = Math.min(1, this._min_fps / this.stage.frameRate) * _WIDTH;
				this._hfps_bar.x = Math.min(1, this._max_fps / this.stage.frameRate) * _WIDTH;
			}
			else if (this._updates % 5 == 0)
				this._redrawMemGraph();

			// Move along regardless of whether the graph
			// was updated this time around
			this._mem_graph.x = this._updates % 5;

			this._updates++;
		}

		private _redrawMemGraph()
		{
			var i:number;
			var g:Graphics;
			var max_val:number = 0;

			// Redraw memory graph (only every 5th update)
			this._mem_graph.scaleY = 1;
			g = this._mem_graph.graphics;
			g.clear();
			g.lineStyle(.5, _MEM_COL, 1, true, LineScaleMode.NONE);
			g.moveTo(5 * (this._mem_points.length - 1), -this._mem_points[this._mem_points.length - 1]);
			for (i = this._mem_points.length - 1; i >= 0; --i)
			{
				if (this._mem_points[i + 1] == 0 || this._mem_points[i] == 0)
				{
					g.moveTo(i * 5, -this._mem_points[i]);
					continue;
				}

				g.lineTo(i * 5, -this._mem_points[i]);

				if (this._mem_points[i] > max_val)
					max_val = this._mem_points[i];
			}
			this._mem_graph.scaleY = this._dia_bmp.height / max_val;
		}

		private _getRamString(ram:number):string
		{
			var ram_unit:string = 'B';

			if (ram > 1048576)
			{
				ram /= 1048576;
				ram_unit = 'M';
			}
			else if (ram > 1024)
			{
				ram /= 1024;
				ram_unit = 'K';
			}

			return ram.toFixed(1) + ram_unit;
		}

		public reset()
		{
			var i:number;

			// Reset all values
			this._updates = 0;
			this._num_frames = 0;
			this._min_fps = number.MAX_VALUE;
			this._max_fps = 0;
			this._avg_fps = 0;
			this._fps_sum = 0;
			this._max_ram = 0;

			// Reset RAM usage log
			for (i = 0; i < _WIDTH / 5; i++)
				this._mem_points[i] = 0;

			// Reset FPS log if any
			if (this._mean_data)
			{
				for (i = 0; i < this._mean_data.length; i++)
					this._mean_data[i] = 0.0;
			}

			// Clear diagram this.graphics
			this._mem_graph.graphics.clear();
			this._dia_bmp.fillRect(this._dia_bmp.rect, 0);
		}

		private _endDrag()
		{
			if (this.x < -_WIDTH)
				this.x = -(_WIDTH - 20);
			else if (this.x > this.stage.stageWidth)
				this.x = this.stage.stageWidth - 20;

			if (this.y < 0)
				this.y = 0;
			else if (this.y > this.stage.stageHeight)
				this.y = this.stage.stageHeight - 15;

			// Round this.x/this.y position to make sure it's on
			// whole pixels to avoid weird anti-aliasing
			this.x = Math.round(this.x);
			this.y = Math.round(this.y);

			this._dragging = false;
			this.stage.removeEventListener(Event.MOUSE_LEAVE, this._onMouseUpOrLeave);
			this.stage.removeEventListener(MouseEvent.MOUSE_UP, this._onMouseUpOrLeave);
			this.stage.removeEventListener(MouseEvent.MOUSE_MOVE, this._onMouseMove);
		}

		private _onAddedToStage(ev:Event)
		{
			this._timer.start();
			this.addEventListener(Event.ENTER_FRAME, this._onEnterFrame);
		}

		private _onRemovedFromStage(ev:Event)
		{
			this._timer.stop();
			this.removeEventListener(Event.ENTER_FRAME, this._onTimer);
		}

		private _onTimer(ev:Event)
		{
			// Store current and max RAM
			this._ram = System.totalMemory;
			if (this._ram > this._max_ram)
				this._max_ram = this._ram;

			// Remove first, add last
			if (this._updates % 5 == 0)
			{
				this._mem_points.unshift(this._ram / 1024);
				this._mem_points.pop();
			}

			this._tfaces = this._rfaces = 0;

			// Update polycount if views are available
			if (this._views.length > 0)
			{
				var i:number;

				// Sum up poly counts across all registered views
				for (i = 0; i < this._views.length; i++)
				{
					this._rfaces += this._views[i].renderedFacesCount;
						//this._tfaces += 0;// TODO: total faces
				}
			}

			this._redrawStats();
		}

		private _onEnterFrame(ev:Event)
		{
			var time:number = getTimer() - this._last_frame_timestamp;

			// Calculate current FPS
			this._fps = Math.floor(1000 / time);
			this._fps_sum += this._fps;

			// Update min/max this.fps
			if (this._fps > this._max_fps)
				this._max_fps = this._fps;
			else if (this._fps != 0 && this._fps < this._min_fps)
				this._min_fps = this._fps;

			// If using a limited length log of frames
			// for the average, push the latest recorded
			// framerate onto fifo, shift one off and
			// subtract it from the running sum, to keep
			// the sum reflecting the log entries.
			if (this._mean_data)
			{
				this._mean_data.push(this._fps);
				this._fps_sum -= number(this._mean_data.shift());

				// Average = sum of all log entries over
				// number of log entries.
				this._avg_fps = this._fps_sum / this._mean_data_length;
			}
			else
			{
				// Regular average calculation, i.e. using
				// a running sum since last this.reset
				this._num_frames++;
				this._avg_fps = this._fps_sum / this._num_frames;
			}

			this._last_frame_timestamp = getTimer();
		}

		private _onDiagramClick(ev:MouseEvent)
		{
			this.stage.frameRate -= Math.floor((this._diagram.mouseY - this._dia_bmp.height / 2) / 5);
		}

		/**
		 * @private
		 * Reset just the average FPS counter.
		 */
		private _onAverageFpsClick_reset(ev:MouseEvent)
		{
			if (!this._dragging)
			{
				var i:number;

				this._num_frames = 0;
				this._fps_sum = 0;

				if (this._mean_data)
				{
					for (i = 0; i < this._mean_data.length; i++)
						this._mean_data[i] = 0.0;
				}
			}
		}

		private _onCountersClick_reset(ev:MouseEvent)
		{
			this.reset();
		}

		private _onMinMaxBtnClick(ev:MouseEvent)
		{
			this._minimized = !this._minimized;
			this._redrawWindow();
		}

		private _onTopBarMouseDown(ev:MouseEvent)
		{
			this._drag_dx = this.mouseX;
			this._drag_dy = this.mouseY;

			this.stage.addEventListener(MouseEvent.MOUSE_MOVE, this._onMouseMove);
			this.stage.addEventListener(MouseEvent.MOUSE_UP, this._onMouseUpOrLeave);
			this.stage.addEventListener(Event.MOUSE_LEAVE, this._onMouseUpOrLeave);
		}

		private _onMouseMove(ev:MouseEvent)
		{
			this._dragging = true;
			this.x = this.stage.mouseX - this._drag_dx;
			this.y = this.stage.mouseY - this._drag_dy;
		}

		private _onMouseUpOrLeave(ev:Event)
		{
			this._endDrag();
		}
	}
}
