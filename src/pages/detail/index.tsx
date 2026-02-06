import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { CoinProps } from "../home";

import styles from "./detail.module.css";

interface ResponseData {
  data: CoinProps;
}

interface ErrorData {
  error: string;
}

type DataProps = ResponseData | ErrorData;

export default function Detail() {
  const { cripto } = useParams();
  const navigate = useNavigate();

  const [coin, setCoin] = useState<CoinProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCoin() {
      try {
        fetch(`https://rest.coincap.io/v3/assets/${cripto}`)
          .then((response) => response.json())
          .then((data: DataProps) => {
            if ("error" in data) {
              navigate("/");
              return;
            }

            const price = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            });

            const priceCompact = Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              notation: "compact",
            });

            const resultData = {
              ...data.data,
              formatedPrice: price.format(Number(data.data.priceUsd)),
              formatedMarket: priceCompact.format(
                Number(data.data.marketCapUsd),
              ),
              formatedVolume: priceCompact.format(
                Number(data.data.volumeUsd24Hr),
              ),
            };

            setCoin(resultData);
            setLoading(false);
          });
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    }
    getCoin();
  }, [cripto]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h4 className={styles.center}>Loading...</h4>;
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>{coin?.name}</h1>
      <h1 className={styles.center}>{coin?.symbol}</h1>

      <section className={styles.content}>
        <img
          src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`}
          alt="Logo da moeda"
          className={styles.logo}
        />
        <h1>
          {coin?.name} | {coin?.symbol}
        </h1>

        <p>
          <strong>Price: </strong>
          {coin?.formatedPrice}
        </p>
        <a href="">
          <p>
            <strong>Mercado: </strong>
            {coin?.formatedMarket}
          </p>
        </a>
        <a href="">
          <p>
            <strong>Volume: </strong>
            {coin?.formatedVolume}
          </p>
        </a>

        <a href="">
          <strong>Changed 24h: </strong>
          <span
            className={
              Number(coin?.changePercent24Hr) > 0 ? styles.protift : styles.Loss
            }
          >
            {Number(coin?.changePercent24Hr).toFixed(3)}
          </span>
        </a>
      </section>
    </div>
  );
}
