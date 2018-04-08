import Vue from 'vue';
import iView from 'iview';
import '../config.less';

/* 重写iView表单验证方式（验证不通过时停止验证） */
iView.Form.methods.validate = function(callback) {
	let valid = true;
	let count = 0;
	let fields = this.fields;
	for (count = 0; count < fields.length; count++) {
		const field = fields[count];
		field.validate('', errors => {
			if (errors) {
				valid = false;
			}
		});
		if (!valid) {
			if (typeof callback === 'function') {
				callback(valid);
			}
			break;
		}
	}
	if (valid) {
		callback(valid);
	}
};

// 面板关闭时传出搜索词
iView.Cascader.methods.handleClose = function() {
	this.$emit('onChangeQueryWord', this.query);
    this.visible = false;
};

// Input 是否需要取消默认事件
iView.Input.props.isPrevent = {
	type: Boolean,
    default: false
};
iView.Input.methods.handleKeydown = function(event) {
	if( event.key == 'Enter' && this.isPrevent ){
		event.preventDefault();
	}
    this.$emit('on-keydown', event);
};

Vue.use(iView);
