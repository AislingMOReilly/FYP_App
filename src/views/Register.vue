<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <alert @dismissed="onDismissed" :text="error.message"></alert>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                        <form @submit.prevent="onRegister">
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                        name="username"
                                        label="Username"
                                        id="username"
                                        v-model="username"
                                        type="username"
                                        required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                        name="email"
                                        label="Email"
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                        name="password"
                                        label="Password"
                                        id="password"
                                        v-model="password"
                                        type="password"
                                        required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        v-model="confirmPassword"
                                        type="password"
                                        :rules="[comparePasswords]">
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout row class="mt-6">
                                <v-flex xs12>
                                    <v-btn large color="primary" type="submit" :loading="loading" :disabled="loading" class="ma-2">Register
                                        <span slot="loader" class="custom-loader">
                                            <v-icon light>mdi-cached</v-icon>
                                        </span>
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>    
    </v-container>
</template>


<script>
    export default {
        data: () => ({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }),

        computed: {
            comparePasswords() {
                return this.password !== this.confirmPassword
                    ? "Passwords do not match"
                    : "";
            },
            user () {
                return this.$store.getters.user
            },
            error () {
                return this.$store.getters.error
            },
            loading () {
                return this.$store.getters.loading
            }
        },
        watch: {
            user (value) {
                if (value !== null && value !== undefined) {
                    this.$router.push('/')
                }
            }
        },
        methods: {
            onRegister () {
                console.log({username: this.username, email: this.email, password: this.password})
                this.$store.dispatch('registerUser', {username: this.username, email: this.email, password: this.password})
            },
            onDismissed () {
                this.$store.dispatch('clearError')
            }
            //onRegister() {
                // firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                // .then(() => {
                //     alert("Successfully registered");
                //     this.$router.push("/");
                // })
                // .catch(error => {
                //     alert(error.message);
                // });
            //},
        },
    };
</script>

<style>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>