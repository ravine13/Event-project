import AdminHeader from './AdminHeader';
import AdminNav from './AdminNav';
import AdminMain from './AdminMain';

function OrganizerDashBoard() {
	return (
		<div className='dash_container'>
			<AdminHeader></AdminHeader>
			<AdminNav></AdminNav>
			<AdminMain></AdminMain>
		</div>
	);
};

export default OrganizerDashBoard;