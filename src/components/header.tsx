import { Link } from 'react-router';
import { tss } from '@/styles';
import { Col, Container, Row } from 'react-bootstrap';
import { useEffect, useRef } from 'react';

const useStyles = tss.create({
	header: {
		top: 0,
		left: 0,
		right: 0,
		position: 'fixed',
		backgroundColor: 'white',
		borderBottom: `1px solid`,
		'& nav ul': {
			margin: 0,
			padding: 0,
			display: 'flex',
			listStyle: 'none',
			'& li': {
				padding: 16,
				'&:first-of-type': {
					paddingLeft: 0,
				},
			},
		},
	},
});

export const Header = () => {
	const { classes } = useStyles();
	const headerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleWindowResize = () => {
			const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
			document.body.style.paddingTop = `${headerHeight}px`;
		};

		handleWindowResize();
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return (
		<header ref={headerRef} className={classes.header}>
			<Container>
				<Row>
					<Col>
						<nav>
							<ul>
								<li>
									<Link to="/">Home</Link>
								</li>
							</ul>
						</nav>
					</Col>
				</Row>
			</Container>
		</header>
	);
};
