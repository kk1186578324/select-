/*
 * @Author: UEDHE
 * @Date:   2017-08-21 12:47:51
 * @Last Modified by:   UEDHE
 * @Last Modified time: 2017-08-21 15:45:16
 */
;
(function($) {
	function DropDown(ele, config) {
		this.ele = ele;

		this.config = {
			data: null,
			defaults: null,
			eventType: 'click',
			callBack: function() {

			}
		};
		// 默认参数扩展
		if (config && $.isPlainObject(config)) {
			$.extend(this.config, config);
		};
	};
	DropDown.prototype = {
		Constructor:DropDown,
		init: function() {
			this.render();
		},
		render: function() {
			var _this = this,
				config = _this.config,
				_html = [];
			_html.push('<span class="drop-down-text">' + (config.defaults ? config.defaults.value : '请选择') + '</span><ul class="drop-down">');
			for (var i = 0, len = config.data.length; i < len; i++) {
				_html.push('<li class="drop-down-item" data-value="' + config.data[i].id +'">' + config.data[i].value + '</li>');
			};
			_html.push('</ul>');
			_this.ele.html(_html.join(''));
			_this.eventBind();
		},
		eventBind: function() {
			var _this = this,
				config = _this.config,
				$text = _this.ele.find('.drop-down-text');
			_this.ele.on(config.eventType,function(e){
				e.stopPropagation();
				_this.show();
			});
			_this.ele.on('click','li',function(e){
				e.stopPropagation();
				var $this = $(this),
					text = $this.text();
 				config.defaults = {
					'id': $this.data('value'),
					'value': $this.text()
				};
				$text.text(text);
				_this.config.callBack(config.defaults);
				_this.hide();
			});
		},
		show: function() {
			this.ele.find('ul').show();
		},
		hide: function() {
			this.ele.find('ul').hide();
		}
	};
	window.DropDown = DropDown;

	// 封装到jquery对象上去
    $.fn.daqDropDown = function(config) {
        return this.each(function() {
            var daqDropDown = new DropDown($(this), config);
            daqDropDown.init();
        });
    };

})(window.jQuery || $);