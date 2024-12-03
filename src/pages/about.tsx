import { useParams } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import { pokeService } from '@/lib/services';
import { AsyncComponent } from '@/components';

export const About = () => {
	const { name } = useParams<{ name: string }>();

	return (
		<Container>
			<AsyncComponent httpRequest={pokeService.getPokemonByName(name!)}>
				{(data) => {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const { other, versions, ...sprites } = data.sprites;

					return (
						<Row>
							<Col>
								<h1>
									#{data.id} {data.name}
								</h1>
								{Object.values(sprites).map((sprite, spriteIndex) => (
									<img key={spriteIndex} src={sprite} />
								))}
								<ul>
									{data.stats.map((stat, statIndex) => (
										<li key={statIndex}>
											{stat.stat.name}: {stat.base_stat}
										</li>
									))}
								</ul>
							</Col>
						</Row>
					);
				}}
			</AsyncComponent>
		</Container>
	);
};
