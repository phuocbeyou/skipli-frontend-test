import { useEffect, useState } from 'react';
import GithubSearch from './components/GithubSearch';

export default function GithubSearchPage() {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  useEffect(() => {
    const storedPhone = localStorage.getItem('phoneNumber');
    if (storedPhone) {
      setPhoneNumber(storedPhone);
    }
  }, []);

  if (!phoneNumber) return <p>Loading phone number...</p>;

  return (
    <div>
      <GithubSearch phoneNumber={phoneNumber} />
    </div>
  );
}
