<script lang="ts">
    import { goto } from '@roxi/routify';
    import { AuthenticationApi } from '$api/index';

    const accountApi = new AuthenticationApi();

    let title = 'Login';
    let username = '';
    let password = '';

    async function handleSubmit() {
        accountApi.authSignIn({username, password})
        .then((response) => {
            console.log(response);
            $goto('/home');
        })
        .catch((error) => {
            console.log(error);
        });
    }
    function validateForm(username:string, password:string) {
        return username.length > 0 && password.length > 0;
    }
</script>

<svelte:head>
    <title>ZapMe - {title}</title>
</svelte:head>

<form on:submit|preventDefault={handleSubmit}>
    <h3>Sign In</h3>

    <label for="username">Username</label>
    <input type="username" placeholder="Username" name="username" bind:value={username}>

    <label for="password">Password</label>
    <input type="password" placeholder="Password" name="password" bind:value={password}>

    <button type="submit" disabled='{!validateForm(username, password)}'>Sign In</button>

    <div class="social">
        <button><i></i>Google</button>
        <button><i></i>Twitter</button>
    </div>
</form>

<a href="/register">Register</a>

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

    .social{
        display: flex;
        gap: 10px;
    }
    .social button{
        margin-top: 20px;
        background: red;
        width: 150px;
        border-radius: 3px;
        padding: 5px 10px 10px 5px;
        background-color: rgba(255,255,255,0.27);
        color: #eaf0fb;
        text-align: center;
    }
    .social button:hover{
        background-color: rgba(255,255,255,0.47);
    }
    .social i{
        margin-right: 4px;
    }
</style>