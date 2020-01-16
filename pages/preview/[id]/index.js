import React from 'react';
import { useRouter } from 'next/router';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
      <h1>Preview: {id}</h1>
  );
};

export default Post