import { tss } from '@/styles';
import { useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const useStyles = tss.create(({ theme }) => ({
	footer: {
		left: 0,
		right: 0,
		bottom: 0,
		padding: '16px 0',
		position: 'absolute',
		backgroundColor: theme.primaryColor,
	},
}));

export const Footer = () => {
	const { classes } = useStyles();
	const footerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleWindowResize = () => {
			const footerHeight = footerRef.current?.getBoundingClientRect().height ?? 0;
			document.body.style.paddingBottom = `${footerHeight}px`;
		};

		handleWindowResize();
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	return (
		<footer ref={footerRef} className={classes.footer}>
			<Container>
				<Row>
					<Col>this is the footer</Col>
				</Row>
			</Container>
		</footer>
	);
};
