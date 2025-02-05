'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, TextInput } from '@payloadcms/ui'
import { PasswordInput } from 'node_modules/@payloadcms/ui/dist/fields/Password/input.js'

export default function CreateAccountForm() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, name, email, password }),
    })

    if (!response.ok) {
      console.error('Failed to create account', response)
      return
    }

    router.push('/admin')
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Username"
        path="username"
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />

      <TextInput
        label="Name"
        path="name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />

      <TextInput
        label="Email"
        path="email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />

      <PasswordInput
        label="Password"
        path="password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />

      <Button type="submit">Create account</Button>
    </form>
  )
}
