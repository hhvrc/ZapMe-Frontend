<script lang="ts">
    import { goto } from '@roxi/routify';
    import { AccountApi } from '$api/index';

    const accountApi = new AccountApi();

    let title = 'Register';
    let username = '';
    let email = '';
    let password = '';
    let confirmedPassword = '';

    async function handleSubmit() {
        accountApi.createAccount({username, email, password})
        .then((response) => {
            console.log(response);
            $goto('/home');
        })
        .catch((error) => {
            console.log(error);
        });
    }
    function validateForm(username:string, password:string, email:string, confirmedPassword:string) {
        return username.length > 0 && password.length > 0 && email.length > 0 && password === confirmedPassword;
    }
</script>

<svelte:head>
    <title>ZapMe - {title}</title>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</svelte:head>

<form on:submit|preventDefault={handleSubmit}>
    <h3>Register</h3>

    <label for="username">Username</label>
    <input type="username" placeholder="Username" name="username" bind:value={username}>

    <label for="email">Email</label>
    <input type="email" placeholder="Email" name="email" bind:value={email}>

    <label for="password">Password</label>
    <input type="password" placeholder="Password" name="password" bind:value={password}>

    <label for="password">Confirm Password</label>
    <input type="password" placeholder="Password" name="password" bind:value={confirmedPassword}>

    <div class="g-recaptcha" data-sitekey="{import.meta.env.VITE_RECAPTCHA_SITEKEY}"></div>

    <button type="submit" disabled='{!validateForm(username, password, email, confirmedPassword)}'>Register</button>
</form>

<a href="/login">Login</a>

<style>
    *,
    *:before,
    *:after{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    form{
        height: fit-content;
        width: fit-content;
        min-width: 500px;
        background-color: rgba(255,255,255,0.13);
        position: absolute;
        transform: translate(-50%,-50%);
        top: 50%;
        left: 50%;
        border-radius: 10px;
        border: 2px solid rgba(255,255,255,0.1);
        box-shadow: 0 0 40px rgba(8,7,16,0.6);
        padding: 50px 35px;
    }
    form *{
        font-family: 'Poppins',sans-serif;
        color: #ffffff;
        letter-spacing: 0.5px;
        outline: none;
        border: none;
    }
    form h3{
        font-size: 42px;
        font-weight: 500;
        line-height: 42px;
        text-align: center;
    }

    form label{
        display: block;
        margin-top: 30px;
        font-size: 16px;
        font-weight: 500;
    }
    form input{
        display: block;
        height: 50px;
        width: 100%;
        background-color: rgba(255,255,255,0.07);
        border-radius: 3px;
        padding: 0 10px;
        margin-top: 8px;
        font-size: 14px;
        font-weight: 300;
    }
    ::placeholder{
        color: #e5e5e5;
    }
    form div {
        margin-top: 30px;
    }
    form .g-recaptcha{
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 304px;
    }
    form button{
        margin-top: 30px;
        width: 100%;
        background-color: #ffffff;
        color: #080710;
        padding: 15px 0;
        font-size: 18px;
        font-weight: 600;
        border-radius: 5px;
        cursor: pointer;
    }
</style>