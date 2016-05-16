import $ from "jquery";

export class ComponentBase{
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
        
    }
}