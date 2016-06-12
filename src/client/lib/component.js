import $ from "jquery";

export class ComponentBase{
    attach($mount){
        this._$mount = $mount;
		this._onDetachHandlers = [];
		this.children = [];
		this._onAttach();
    }
    
    _onAttach() {
        
	}
	
	_onDetach() {
	    
	}
} 

export class ElementComponent extends ComponentBase{
    get $element(){
        return this._$element;
    }
    
    constructor(elementType="div"){
        super();
        this._$element = $(`<${elementType}>`).data("component", this);
    }
    
    attach($mount){
        super.attach($mount);
        this.$element.appendTo(this._$mount);
    }
    
    detach(){
        super.detach();
		this.$element.remove();
    }
    
    _setClass(className, isOn){
        if(isOn){
            this._$element.addClass(className);
        } else {
            this._$element.removeClass(className);
        }
    }
}