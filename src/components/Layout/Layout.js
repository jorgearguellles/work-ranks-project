import React from "react";
import Head from "next/head";
import styles from "./Layout.module.css";

const Layout = ({ children, title = "World Ranks" }) => {
	return (
		<div className={styles.container}>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className={styles.header}>
				<h1>WORLD RANKS</h1>
			</header>

			<main className={styles.main}>{children}</main>

			<footer className={styles.footer}>Jorge Arias Argüelles </footer>
		</div>
	);
};

export default Layout;
