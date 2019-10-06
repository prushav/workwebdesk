import React, { Fragment } from 'react';
import { debounce } from 'lodash';
import Address from '../components/Address/address';
import ShippingOptions from './shipping-options';
import TextInput from '../components/TextInput/text-input';

export default class SingleShipping extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            address: {},
            comment : ''
        };

        this._debouncedOnAddressChange = debounce(() => this.props.onAddressChange(this.state.address), 1000);
    }

    componentDidMount() {
        this.props.onAddressChange(this.props.address);
        this.props.onCommentChange(this.props.comment);
        this.setState({ address: this.props.address || {} ,comment : this.props.comment || ''});
    }

    render() {
        return (
            <Fragment>
                <Address
                    name={ 'shipping' }
                    address={ this.state.address }
                    countries={ this.props.countries }
                    onChange={ (fieldName, address,customField) => this._onChange(fieldName, address,customField) } />
                <ShippingOptions
                    options={ this.props.options }
                    selectedOptionId={ this.props.selectedOptionId }
                    isSelectingShippingOption={ this.props.isSelectingShippingOption() }
                    isUpdatingShippingAddress={ this.props.isUpdatingShippingAddress() }
                    onSelect={ this.props.onSelect }
                />
                <TextInput
                    textarea={true}
                    optional={true}
                    id={ `customMessage` }
                    label={ 'order comment' }
                    value={ this.state.comment}
                    onChange = {({target})=>this.setState({comment : target.value})}
                    onBlur={ ({ target }) =>{
                    return this.props.onCommentChange(target.value) 
                }}
                    width={ 'twoThird' } />
            </Fragment>
        );
    }

    _onChange(fieldName, value,customField = false) {
        let address = {} ;

        if(customField == true){
            address = Object.assign(
                {},
                this.state.address,
            );
            address.customFields[0] = {
                fieldId : fieldName,
                fieldValue : value
            } 
        }else{
            address = Object.assign(
                {},
                this.state.address,
                { [fieldName]: value }
            );
        }
        this.setState({ address: address }, () => this._updateShippingAddress(fieldName));
    }

  

    _updateShippingAddress(fieldName) {
        if (this._shouldUpdateShippingAddress(fieldName)) {
            this._debouncedOnAddressChange();
        }
    }

    _isFormValid() {
        return this.state.address.firstName &&
            this.state.address.lastName &&
            this.state.address.address1 &&
            this.state.address.city &&
            this.state.address.postalCode &&
            (
                this.state.address.stateOrProvinceCode ||
                this.state.address.stateOrProvince
            ) &&
            this.state.address.countryCode &&
            this.state.address.phone;
    }

    _shouldUpdateShippingAddress(fieldName) {
        const shippingOptionUpdateFields = [
            'address1',
            'address2',
            'city',
            'postalCode',
            'stateOrProvince',
            'stateOrProvinceCode',
            'countryCode',
        ];

        if (!this._isFormValid()) {
            return false;
        }

        return (
            !this.props.options ||
            !this.props.options.length ||
            shippingOptionUpdateFields.includes(fieldName)
        );
    }
}
