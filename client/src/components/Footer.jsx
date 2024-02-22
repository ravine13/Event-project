export default function Footer() {
  	return (
		<footer className='text-white'>
			<div className='container'>
				<div className='footer-div_1 d-flex justify-content-center'>Ticket Nexus</div>
				<div className='footer-div_2 d-flex justify-content-between'>
					<div>
						<ul>
                            <p className='text-underline text-primary'>Quick Links</p>
							<li><a href='/home'>Homes</a></li>
							<li><a href='/event'>Events</a></li>
							<li><a href='/authpage/signup'>Login</a></li>
						</ul>
					</div>

					<div>
						<ul>
							<li><a href='/'>Invest</a></li>
							<li><a href='/'>Partner</a></li>
							<li><a href='/'>Insurance Policy</a></li>
						</ul>
					</div>


					<div>
						<ul>
							<li><a href='/'>FAQs</a></li>
							<li><a href='/'>About</a></li>
							<li><a href='/'>Customer service</a></li>
							<li><a href='/'>Partnership</a></li>
							<li><a href='/'>Terms & conditions</a></li>
							<li><a href='/'>Privacy & Cookie Policy</a></li>
						</ul>
					</div>					
				</div>
			</div>
			<div className='copyright d-flex justify-content-center align-items-center'>
                <p className='p-2 m-0'>&copy; 2024 Ticket Nexus. All rights reserved.</p>
			</div>
		</footer>
  	)
}