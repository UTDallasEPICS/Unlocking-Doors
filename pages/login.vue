<template>
  <div class="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <img class="h-16 w-auto" src="~/assets/logo.png" alt="Unlocking Doors" />
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Contact Database Login
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Secure passwordless authentication
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div v-if="error" class="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
          <div class="flex">
            <div class="ml-3">
              <p class="text-sm text-red-700">
                {{ error }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="successMessage" class="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
          <div class="flex">
            <div class="ml-3">
              <p class="text-sm text-green-700">
                {{ successMessage }}
              </p>
            </div>
          </div>
        </div>

        <!-- Step 1: Send OTP -->
        <form v-if="step === 'email'" @submit.prevent="handleSendOtp" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                autocomplete="email"
                placeholder="you@example.com"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
            >
              <span v-if="loading">Sending Code...</span>
              <span v-else>Send Verification Code</span>
            </button>
          </div>
        </form>

        <!-- Step 2: Verify OTP -->
        <form v-else @submit.prevent="handleVerifyOtp" class="space-y-6">
          <div>
            <label for="otp" class="block text-sm font-medium text-gray-700">
              One-Time Password (OTP)
            </label>
            <div class="mt-1">
              <input
                id="otp"
                v-model="otp"
                type="text"
                required
                maxlength="6"
                pattern="[0-9]{6}"
                autocomplete="one-time-code"
                placeholder="123456"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-bold tracking-widest sm:text-sm"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <button
                type="button"
                @click="step = 'email'"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                Change email address
              </button>
            </div>
            <div class="text-sm">
              <button
                type="button"
                @click="handleSendOtp"
                :disabled="loading"
                class="font-medium text-blue-600 hover:text-blue-500 disabled:text-blue-400"
              >
                Resend Code
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
            >
              <span v-if="loading">Verifying...</span>
              <span v-else>Verify & Sign In</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { authClient } from '~/utils/auth-client';

// Disable default layout for login page so the app navbar doesn't show up!
definePageMeta({
  layout: false
});

const email = ref('');
const otp = ref('');
const step = ref<'email' | 'otp'>('email');
const loading = ref(false);
const error = ref('');
const successMessage = ref('');

const handleSendOtp = async () => {
  error.value = '';
  successMessage.value = '';
  loading.value = true;

  try {
    const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({
      email: email.value,
      type: 'sign-in',
    });

    if (sendError) {
      error.value = sendError.message || 'Failed to send verification code. Ensure your email is registered by an administrator.';
    } else {
      successMessage.value = 'Verification code sent successfully to your email!';
      step.value = 'otp';
    }
  } catch (err: any) {
    error.value = err?.message || 'An unexpected error occurred. Please try again.';
  } finally {
    loading.value = false;
  }
};

const handleVerifyOtp = async () => {
  error.value = '';
  loading.value = true;

  try {
    const { data, error: verifyError } = await authClient.signIn.emailOtp({
      email: email.value,
      otp: otp.value,
    });

    if (verifyError) {
      error.value = verifyError.message || 'Incorrect verification code. Please try again.';
    } else {
      // Hard redirect to / to trigger server middleware, set compatibility cookies, and load the app
      window.location.href = '/';
    }
  } catch (err: any) {
    error.value = err?.message || 'Verification failed. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Redirect already logged-in users to the main search page
const uduser = useCookie('uduser');
if (uduser.value) {
  await navigateTo('/');
}
</script>
