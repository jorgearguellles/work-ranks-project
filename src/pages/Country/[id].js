import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";
import { useState, useEffect } from "react";

const getCountry = async (id) => {
	const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

	const country = await res.json();

	return country;
};

const Country = ({ country }) => {
	const [borders, setBorders] = useState([]);

	const getBorder = async () => {
		const borders = await Promise.all(
			country.borders.map((border) => getBorder(border))
		);

		setBorders(borders);
	};

	useEffect(() => {
		getBorder();
	}, []);

	return (
		<Layout title={country.name}>
			<div>
				<div className={styles.overview_panel}>
					<img src={country.flag} alt={country.name} />

					<h1 className={styles.overview_name}>{country.name}</h1>
					<div className={styles.overview_region}>{country.region}</div>

					<div className={styles.overview_numbers}>
						<div className={styles.overview_population}>
							<div className={styles.overview_value}> {country.population}</div>
							<div className={styles.overview_label}> Población:</div>
						</div>
						<div className={styles.overview_area}>
							<div className={styles.overview_value}> {country.area}</div>
							<div className={styles.overview_label}> Aréa:</div>
						</div>
					</div>
				</div>

				<div className={styles.details_panel}>
					<h4 className={styles.details_panel_heading}>Detalles</h4>

					<div className={styles.details_panel_row}>
						<div className={styles.details_panel_label}>Capital</div>
						<div className={styles.details_panel_value}>{country.capital}</div>
					</div>

					<div className={styles.details_panel_row}>
						<div className={styles.details_panel_label}>Lengua / Idioma</div>
						<div className={styles.details_panel_value}>
							{country.languages.map(({ name }) => name).join(", ")}
						</div>
					</div>

					<div className={styles.details_panel_row}>
						<div className={styles.details_panel_label}>Moneda local</div>
						<div className={styles.details_panel_value}>
							{country.currencies.map(({ name }) => name).join(", ")}
						</div>
					</div>

					<div className={styles.details_panel_row}>
						<div className={styles.details_panel_label}>Nombre nativo</div>
						<div className={styles.details_panel_value}>
							{country.nativeName}
						</div>
					</div>

					<div className={styles.details_panel_row}>
						<div className={styles.details_panel_label}>Gini</div>
						<div className={styles.details_panel_value}>{country.gini}%</div>
					</div>

					<div className={styles.details_panel_borders}>
						{borders.map(({ flag, name }) => {
							<div className={styles.details_panel_borders_country}>
								<img src={flag} alt={name} />
								<div className={styles.details_panel_borders_name}>{name}</div>
							</div>;
						})}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Country;

export const getServerSideProps = async ({ params }) => {
	const country = await getCountry(params.id);

	return {
		props: { country },
	};
};
