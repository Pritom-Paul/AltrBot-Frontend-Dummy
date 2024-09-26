<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { isAuthenticated } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  // Authentication
  let username = '';
  let password = '';
  let envAPI = import.meta.env.VITE_API_GOBLIN_LOCAL_API;

  async function handleSubmit(event: Event) {
    event.preventDefault(); // Prevent form submission from refreshing the page
    console.log('Username:', username);
    console.log('Password:', password);
    
    try {
      const response = await fetch(`${envAPI}/user/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const responseData = await response.json();
      console.log(responseData);
      window.localStorage.setItem('access_token', responseData.access);
      console.log(window.localStorage.getItem('access_token'));
      isAuthenticated.set(true);

      // Redirect to /services-homepage
      // window.location.href = '/';
      // Check for redirect parameter
      const redirectTo = new URLSearchParams(window.location.search).get('redirect') || '/services-homepage';
      goto(redirectTo); // Redirect to the original path or homepage
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      alert('Login failed: Incorrect username or password.');
    }
  }
</script>

<div class="flex justify-center items-center h-[80vh] px-4">
<Card.Root class="max-w-sm py-6">
  <Card.Header>
    <Card.Title class="text-2xl">Login</Card.Title>
    <Card.Description>Enter your username below to login to your account</Card.Description>
  </Card.Header>
  <Card.Content>
    <form on:submit={handleSubmit}>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="username">Username</Label>
          <Input id="username" type="text" bind:value={username} placeholder="Username" required />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <!-- <a href="##" class="ml-auto inline-block text-sm underline">
              Forgot your password?
            </a> -->
          </div>
          <Input id="password" type="password" bind:value={password} placeholder="*****" required />
        </div>
        <Button type="submit" class="w-full">Login</Button>
      </div>
    </form>
  </Card.Content>
</Card.Root>
</div>
