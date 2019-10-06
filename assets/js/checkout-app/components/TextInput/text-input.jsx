import React from 'react';
import InputContainer from '../InputContainer/input-container'
import styles from './text-input.scss';

export default class TextInput extends React.PureComponent {
    render() {
        return (
            <InputContainer
                id={ this.props.id }
                label={ this.props.label }
                helpText={ this.props.optional ? 'Optional' : '' }
                width={ this.props.width }
                body={
                    this.props.textarea == true ?
                    <textarea
                    type="text"
                    id={ this.props.id }
                    value={ this.props.value || '' }
                    required={ !this.props.optional }
                    onChange={ this.props.onChange }
                    placeholder={ this.props.placeholder }
                    className={ styles.input }
                    onBlur ={this.props.onBlur}  
                    cols="30" 
                    rows="10"></textarea>
                    :
                    <input
                        type="text"
                        id={ this.props.id }
                        value={ this.props.value || '' }
                        required={ !this.props.optional }
                        onChange={ this.props.onChange }
                        placeholder={ this.props.placeholder }
                        className={ styles.input }
                        onBlur ={this.props.onBlur} />
                } />
        );
    }
}
