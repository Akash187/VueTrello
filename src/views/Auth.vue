<template>
  <div class="auth-container">
    <div class="auth">
      <h1 class="title">{{signIn ? 'Sign in to your account' : 'Create a VueTrello Account'}}</h1>
      <div>
        <b-alert
            :show="dismissCountDown"
            dismissible
            variant="warning"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >
          {{ submissionErrorMsg }}
        </b-alert>
      </div>
      <b-form @submit.prevent="onSubmit" class="auth-form" :novalidate="true" :validated="!signIn && error">
        <b-form-group
            id="input-group-1"
            label="Name *"
            label-for="input-1"
            v-show="!signIn"
        >
          <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              required
              placeholder="e.g., Micheal Jackson"
              :pattern="namePattern"
          ></b-form-input>
          <b-form-invalid-feedback>
            Please enter a name.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
            id="input-group-2"
            label="Email *"
            label-for="input-2"
        >
          <b-form-input
              id="input-2"
              v-model="form.email"
              type="email"
              required
              :pattern="emailPattern"
              placeholder="e.g., micheal@popking.com"
          ></b-form-input>
          <b-form-invalid-feedback>
            Please enter a valid Email.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
            id="input-group-3"
            label="Password *"
            label-for="input-3"
        >
          <b-form-input
              id="input-3"
              v-model="form.password"
              type="password"
              required
              placeholder="e.g., ........."
              :pattern="passwordPattern"
          ></b-form-input>
          <b-form-invalid-feedback>
            Password must be 8 character long with at least one letter, one number and one special
            character:.
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button type="submit" class="submit-btn" variant="success"
                  :disabled="this.$store.state.submitting">
          <div v-if="!this.$store.state.submitting">
            {{signIn ? 'LogIn' : 'SignUp'}}
          </div>
          <circle2 v-else class="form-loader"/></b-button>
        <b-button class="google-signIn-btn" variant="outline-primary" @click="googleOAuth">
          <font-awesome-icon :icon="google" size="lg"/>
          {{signIn ? 'Log in' : 'Sign up'}} with Google
        </b-button>
      </b-form>
      <div class="change-auth-type">
        <div v-if="signIn">
          Create an Account? <strong @click.prevent="changeAuthType(false)">SignUp</strong>
        </div>
        <div v-else>
          Already have an Account? <strong @click.prevent="changeAuthType(true)">LogIn</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {BForm, BFormGroup, BFormInput, BButton, BFormInvalidFeedback, BAlert} from 'bootstrap-vue'
  import {faGoogle} from '@fortawesome/free-brands-svg-icons'
  import { Circle2 } from 'vue-loading-spinner'

  export default {
    name: "Auth",
    components: {
      BForm, BButton, BFormInput, BFormGroup, BFormInvalidFeedback, BAlert, Circle2
    },
    data() {
      return {
        signIn: false,
        error: false,
        dismissSecs: 5,
        dismissCountDown: 0,
        submissionErrorMsg: '',
        emailPattern: '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?',
        namePattern: '[A-Za-z ]{3,}',
        passwordPattern: '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$',
        form: {
          email: '',
          password: '',
          name: ''
        }
      }
    },
    computed: {
      google () {
        return faGoogle
      }
    },
    methods: {
      onSubmit() {
        this.error = true
        let name = this.form.name
        let email = this.form.email
        let password = this.form.password
        let emailRegx = new RegExp(this.emailPattern);
        let nameRegx = new RegExp(this.namePattern)
        let passwordRegx = new RegExp(this.passwordPattern)
        if (nameRegx.test(name)
          && emailRegx.test(email)
          && passwordRegx.test(password)) {
          if(!this.signIn) {
            this.$store.dispatch('emailSignUp', {name, email, password})
              .then(() => this.$router.push('/'))
              .catch(err => {
                this.dismissCountDown = this.dismissSecs;
                this.submissionErrorMsg = err;
              })
          }
        }else{
          if(this.signIn){
            this.$store.dispatch('emailSignIn', {email, password})
              .then(() => this.$router.push('/'))
              .catch(err => {
                this.dismissCountDown = this.dismissSecs;
                this.submissionErrorMsg = err;
              })
          }
        }
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      changeAuthType(isSignIn) {
        Object.assign(this.$data, this.$options.data());

        this.signIn = isSignIn;
      },
      googleOAuth() {
        this.$store.dispatch('googleOAuth')
          .then(() => this.$router.push('/'))
          .catch(err => {
            this.dismissCountDown = this.dismissSecs;
            this.submissionErrorMsg = err;
          })
      }
    }
  }
</script>

<style scoped>

  .auth{
    padding: 5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0.5rem;
  }

  .title{
    font-size: 32px;
  }

  .auth-form{
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: 100%;
  }

  .google-signIn-btn{
    margin-top: 1rem;
  }

  .change-auth-type{
    padding-top: 2rem;
    color: gray;
    display: flex;
  }

  .change-auth-type div strong{
    color: blue;
    cursor: pointer;
  }

  @media screen and (max-width: 640px) {
    .auth {
      padding: 2rem 0;
    }
  }

  @media screen and (max-device-width: 912px) and (orientation: landscape){
    .auth {
      padding: 2rem 0;
    }
  }

  .submit-btn{
    display: flex;
    justify-content: center;
  }

  .form-loader{
    height: 24px !important;
    width: 24px !important;
  }

</style>