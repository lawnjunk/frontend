import React from 'react'
import * as util from '../../lib/util.js'
import validator from 'validator'

let emptyState = {
  storeName: '',
  storeNameDirty: false,
  storeNameError: '',
  email: '',
  emailDirty: false,
  emailError: '',
  address: '',
  addressDirty: false,
  addressError: '',
  phone: '',
  phoneDirty: false,
  phoneError: '',
  website: '',
  websiteDIrty: false,
  password: '',
  passwordDirty: false,
  passwordError: '',
  submitted: false,
}

class AdminForm extends React.Component {
  constructor(props){
    super(props)
    this.state = emptyState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateChange = this.validateChange.bind(this)
  }

  validateChange(name, value){
    if(this.props.type === 'login')
      return null
    switch (name) {
      case 'storeName':
        if(!validator.isAlpha(value))
          return 'You must provide a company name'
        return null
      case 'email':
        if(!validator.isEmail(value))
          return 'you must provide a valid email'
        return null
      case 'password':
        if(value.length < 8)
          return 'Password must be at least 8 characters long'
        if(!validator.isAlphanumeric(value))
          return 'Your password may only contain numbers and letters'
        return null
      case 'website':
        if(!validator.isURL(value))
          return 'you must provide a valid webiste URL'
        return null
      case 'phone':
        if(validator.isAlpha(value))
          return 'Invalid input'
        if(value.length < 10)
          return 'Please provide a valid phone number'
        return null
      default:
        return null
    }
  }

  handleChange(event){
    let { name, value } = event.target
    this.setState({
      [name]: value,
      [`${ name }Dirty`]: true,
      [`${ name }Error`]: this.validateChange(name, value),
    })
  }

  handleSubmit(event){
    event.preventDefault()
    let { storeNameError, emailError, passwordError } = this.state
    if(this.props.type === 'login' || !storeNameError && !emailError && !passwordError){
      this.props.onComplete(this.state)
      this.setState(emptyState)
    } else {
      this.setState({
        storeNameDirty: true,
        emailDirty: true,
        addressDirty: true,
        phoneDirty: true,
        website: true,
        passwordDirty: true,
        submitted: true,
      })
    }
  }


  render(){
    let { type } = this.props

    type = type === 'login' ? type : 'signup'

    return (
      <form
        className='admin-form'
        noValidate
        onSubmit={ this.handleSubmit } >

        {util.renderIf(this.state.storeNameDirty,
          <p> { this.state.storeNameError } </p>)}

        <input
          name='storeName'
          placeholder='Company Name'
          type='text'
          value={ this.state.storeName }
          onChange={ this.handleChange }
        />

        {util.renderIf(this.state.emailDirty,
          <p> { this.state.emailError } </p>)}

        {util.renderIf(type !== 'login',
          <input
            name='email'
            placeholder='email'
            type='email'
            value={ this.state.email }
            onChange={ this.handleChange }
          />
        )}

        {util.renderIf(this.state.addressDirty,
          <p> { this.state.addressError } </p>)}

        {util.renderIf(type !== 'login',
          <input
            name='address'
            placeholder='address'
            type='text'
            value={ this.state.address }
            onChange={ this.handleChange }
          />
        )}

        {util.renderIf(this.state.phoneDirty,
          <p> { this.state.phoneError } </p>)}

        {util.renderIf(type !== 'login',
          <input
            name='phone'
            placeholder='phone ex:2065554208'
            type='tel'
            value={ this.state.phone }
            onChange={ this.handleChange }
          />
        )}

        {util.renderIf(this.state.websiteDirty,
          <p> { this.state.websiteError } </p>)}

        {util.renderIf(type !== 'login',
          <input
            name='website'
            placeholder='website'
            type='URL'
            value={ this.state.city }
            onChange={ this.handleChange }
          />
        )}

        {util.renderIf(this.state.passwordDirty,
          <p> { this.state.passwordError } </p>)}

        <input
          name='password'
          placeholder='password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
        />

        <button type='submit'> { type } </button>

      </form>
    )
  }
}

export default AdminForm