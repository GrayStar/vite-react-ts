import { AsyncComponent } from '@/components';
import { Link, useSearchParams } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import { pokeService } from '@/lib/services';

const pageSize = 20;

export const Home = () => {
	const [searchParams] = useSearchParams();
	const page = parseInt(searchParams.get('page') ?? '0', 10);

	return (
		<Container>
			<Row>
				<Col>
					<h1>Pokemon</h1>
					<AsyncComponent httpRequest={pokeService.getPokemon({ offset: page * pageSize, limit: pageSize })}>
						{(data) => (
							<>
								<ul>
									{data.results.map((pkmn) => (
										<li key={pkmn.name}>
											<Link to={`/${pkmn.name}`}>{pkmn.name}</Link>
										</li>
									))}
								</ul>
								{data.previous && (
									<Link to={`/?page=${page - 1}`} replace>
										Prev
									</Link>
								)}
								{data.next && (
									<Link to={`/?page=${page + 1}`} replace>
										Next
									</Link>
								)}
							</>
						)}
					</AsyncComponent>
				</Col>
			</Row>
		</Container>
	);
};
