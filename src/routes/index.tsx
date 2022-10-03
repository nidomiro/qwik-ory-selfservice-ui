import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Typography } from "~/components/typography/typograpy";
import { Link } from "~/components/link/link";

export default component$(() => {
  return (
    <div className="my-2">
      <Typography variant="title">
        Welcome to Qwik <span class="lightning">⚡️</span>
      </Typography>

      <Link href="auth/login">Login</Link>


    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
};
