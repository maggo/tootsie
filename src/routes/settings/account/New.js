import React from 'react';
import { connect } from 'react-redux';
import { registerApplication } from '../../../actions/authentication';

const New = ({ onSubmit }) => (
  <div>
    <h3>New Account</h3>

    <form onSubmit={onSubmit}>
      <label htmlFor="handle">Handle</label>
      <input required placeholder="user@instance.tld" id="handle" name="handle" type="text"/>
      <button>Submit</button>
    </form>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (e) => {
    e.preventDefault();
    dispatch(registerApplication(e.target.handle.value));
  }
});

export default connect(null, mapDispatchToProps)(New);
