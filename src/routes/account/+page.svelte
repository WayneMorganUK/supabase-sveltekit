<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import Avatar from './Avatar.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	let { data, form } = $props();

	// let { session, supabase, profile } = $state(data);
	let supabase = $derived(data.supabase);
	let session = $derived(data.session);
	let profile = $derived(data.profile);

	let profileForm: HTMLFormElement | undefined = $state();
	let loading = $state(false);
	let fullName: string = $derived(profile?.full_name ?? '');
	let username: string = $derived(profile?.username ?? '');
	let website: string = $derived(profile?.website ?? '');
	let avatarUrl: string = $derived(profile?.avatar_url ?? '');

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class="form-widget">
	<form
		class="form-widget"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<Avatar
			{supabase}
			url={avatarUrl}
			size={10}
			upload={() => {
				if (profileForm) {
					profileForm.requestSubmit();
				}
			}}
		/>
		<div>
			<label for="email">Email</label>
			<input id="email" type="text" value={session.user.email} disabled />
		</div>

		<div>
			<label for="fullName">Full Name</label>
			<input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
		</div>

		<div>
			<label for="username">Username</label>
			<input id="username" name="username" type="text" value={form?.username ?? username} />
		</div>

		<div>
			<label for="website">Website</label>
			<input id="website" name="website" type="url" value={form?.website ?? website} />
		</div>

		<div>
			<input
				type="submit"
				class="button primary block"
				value={loading ? 'Loading...' : 'Update'}
				disabled={loading}
			/>
		</div>
	</form>

	<form method="post" action="?/signout" use:enhance={handleSignOut}>
		<div>
			<button class="button block" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>
