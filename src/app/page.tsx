"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <h1>Select A Cohort</h1>
      <div className={styles.grid}>
        <div
          className={styles.cohortCard}
          onClick={() => router.push("/deloitte")}
        >
          <h2>Deloitte Cohort</h2>
          <Image
            className={styles.logo}
            src="https://www.deloittedigital.com/favicon.ico"
            alt="Next.js Logo"
            width={50}
            height={50}
            priority
          />
        </div>
      </div>
    </main>
  );
}
