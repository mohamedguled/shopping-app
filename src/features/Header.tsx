import React from 'react'

export default function Header({
  name,
}: {
  name: string;
}) {
  return <h1 className='text-5xl mb-5 text-white '>{name}</h1>;
}
