import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import Contentful from '../services/contentful';

function Home({ content, domainVars }) {
  const router = useRouter();

  const saveLocaleToCookie = (locale) => {
    document.cookie = `NEXT_LOCALE=${locale}`;
  }

  return (
    <div className={styles.container}>
      <h1>{content[0].value}</h1>
      <h1>{content[1].value}</h1>

      <h2>DOMAIN_HASH_MAPPING</h2>
      <span>domain url: {domainVars.domainUrl}</span>
      <span>override url: {domainVars.overrideUrl}</span>
      <span>lang: {domainVars.domainUrl}</span>
      <span>country code: {domainVars.countryCode}</span>


      <Link href="/" locale="en-CA">
        <span  onClick={() => saveLocaleToCookie('en-CA')} style={{ margin: 5}}>Switch Language to English in Canada</span>
      </Link>

      <Link href="/" locale="fr-CA">
        <span onClick={() => saveLocaleToCookie('fr-CA')} style={{ margin: 5}}>Switch Language to French in Canada</span>
      </Link>
    </div>
  )
}

export async function getServerSideProps(context){
  const locale = context.locale;
  const content = await Contentful.getLocales(locale);
  const domains = await Contentful.getDomains();
  const currentDomainVariables = domains.find(i => i.domainUrl === context.req.headers.host);

  return {
    props: { 
      content, 
      domainVars: currentDomainVariables || {}
    }
  }
}

export default Home;