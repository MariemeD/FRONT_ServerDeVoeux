<template>
    <!--Bleu (header) : #536895
    Bleu (carte) : #344C80
    Bleu "ciel" (dans les icons) : #B5B9D1
    Gris : #D5D5D5
    Orange : #C9893C-->
    <div class="base">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-2"></div>
                <div class="col-lg-6 col-md-8 login-box">
                    <div class="col-lg-12 login-key">
                        <i class="fa fa-key" aria-hidden="true"></i>
                    </div>
                    <div class="col-lg-12 login-title">
                        Serveur de voeux
                    </div>
                    <div class="col-lg-12 login-title">
                        Connexion
                    </div>

                    <div class="col-lg-12 login-form">
                        <div class="col-lg-12 login-form">
                            <form>
                                <div class="form-group">
                                    <label class="form-control-label">USERNAME</label>
                                    <input type="text" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label class="form-control-label">PASSWORD</label>
                                    <input type="password" class="form-control" i>
                                </div>

                                <div class="col-lg-12 loginbttm">
                                    <div class="col-lg-6 login-btm login-text">
                                        <!-- Error Message -->
                                    </div>
                                    <div class="col-lg-6 login-btm login-button">
                                        <button type="submit" class="btn btn-outline-primary">LOGIN</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-2"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Login"
        ,mounted() {
            let externalScript = document.createElement('script')
            externalScript.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.slim.min.js')
            externalScript.setAttribute('src', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js')
            document.head.appendChild(externalScript)
        }
    }

</script>

<style scoped>
    .base {
        background: #C9893C;
        font-family: 'Roboto', sans-serif;
    }

    .login-box {
        height: auto;
        background: #344C80;
        text-align: center;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }

    .login-key {
        height: 100px;
        font-size: 80px;
        line-height: 100px;
        background: -webkit-linear-gradient(#27EF9F, #0DB8DE);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .login-title {
        margin-top: 15px;
        text-align: center;
        font-size: 30px;
        letter-spacing: 2px;
        margin-top: 15px;
        font-weight: bold;
        color: #ECF0F5;
    }

    .login-form {
        margin-top: 25px;
        text-align: left;
    }

    input[type=text] {
        background-color: #1A2226;
        border: none;
        border-bottom: 2px solid #C9893C;
        border-top: 0px;
        border-radius: 0px;
        font-weight: bold;
        outline: 0;
        margin-bottom: 20px;
        padding-left: 0px;
        color: #ECF0F5;
    }

    input[type=password] {
        background-color: #1A2226;
        border: none;
        border-bottom: 2px solid #C9893C;
        border-top: 0px;
        border-radius: 0px;
        font-weight: bold;
        outline: 0;
        padding-left: 0px;
        margin-bottom: 20px;
        color: #ECF0F5;
    }

    .form-group {
        margin-bottom: 40px;
        outline: 0px;
    }

    .form-control:focus {
        border-color: inherit;
        -webkit-box-shadow: none;
        box-shadow: none;
        border-bottom: 2px solid #C9893C;
        outline: 0;
        background-color: #1A2226;
        color: #ECF0F5;
    }

    input:focus {
        outline: none;
        box-shadow: 0 0 0;
    }

    label {
        margin-bottom: 0px;
    }

    .form-control-label {
        font-size: 10px;
        color: #6C6C6C;
        font-weight: bold;
        letter-spacing: 1px;
    }

    .btn-outline-primary {
        border-color: #C9893C;
        color: #0DB8DE;
        border-radius: 0px;
        font-weight: bold;
        letter-spacing: 1px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }

    .btn-outline-primary:hover {
        background-color: #0DB8DE;
        right: 0px;
    }

    .login-btm {
        float: left;
    }

    .login-button {
        padding-right: 0px;
        text-align: right;
        margin-bottom: 25px;
    }

    .login-text {
        text-align: left;
        padding-left: 0px;
        color: #A2A4A4;
    }

    .loginbttm {
        padding: 0px;
    }
</style>
