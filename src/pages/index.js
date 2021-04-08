import styles from "../styles/Home.module.css";
import Layout from "../components/Layout/Layout";

export default function Home({ countries }) {
	console.log(countries);
	return (
		<Layout>
			<div className={styles.counts}>
				Se encontraron {countries.length} paises
			</div>
			<SearchInput />
		</Layout>
	);
}

export const getStaticProps = async () => {
	const res = await fetch("https://restcountries.eu/rest/v2/all");
	const countries = await res.json();

	return {
		props: {
			countries,
		},
	};
};
