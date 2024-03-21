import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PasswordResetRequest from './Request';
import ResetPasswordForm from './Request';
import NewPassword from './NewPassword';

function PassReset() {
	return (
		<div>
			{/* <PasswordResetRequest></PasswordResetRequest> */}
			<Routes>
				<Route path='/' element={<ResetPasswordForm></ResetPasswordForm>}></Route>
				<Route path='/new_password' element={<NewPassword></NewPassword>}></Route>
			</Routes>

		</div>
	)
}

export default PassReset;