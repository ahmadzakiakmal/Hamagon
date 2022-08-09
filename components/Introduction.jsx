import Link from "next/link";

export const Introduction = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl mb-5">What is Hamagon?</h1>
      <p className="max-w-[400px] text-center text-lg mb-5 px-5">
        Hamagon is an AI based web application to help you monitor your
        plant&apos;s health.
        <br />
        Simply upload a photo of your plant and the AI will tell you about its
        health.
      </p>
      <Link href="/check-health">
        <div className="button bg-slate-600 px-5 py-2 rounded cursor-pointer bg-gradient-to-br from-HamagonLight to-Hamagon border text-xl">
          Try Now
        </div>
      </Link>
    </div>
  );
};
