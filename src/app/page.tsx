import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Welcome to Twillflow</h2>
      <p>Start by <Link className="text-blue-600 underline" href="/login">signing in</Link> to continue to onboarding.</p>
    </div>
  );
}
