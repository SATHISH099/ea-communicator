<template>
    <div class="w-full mt-10">
        <div class="mb-10">
            <h2 class="text-center text-primary mb-4">Sign In</h2>
            <p class="text-center">Please enter your credentials below</p>
        </div>
        <FormKit :submit-attrs="{ inputClass: 'btn btn-primary w-full mt-8' }" type="form"
            input-class="btn btn-primary">
            <FormKit placeholder="Email" name="email" validation="required|email" input-class="form-control"
                outer-class="mb-4" />
            <FormKit validation="required" placeholder="Password" type="password" suffix-icon-class="eye-icon"
                suffix-icon="eyeClosed" @suffix-icon-click="handleIconClick" input-class="form-control"
                inner-class="relative mb-3" />
            <NuxtLink class="flex justify-end" to="/forgot-password">Forgot Password?</NuxtLink>
        </FormKit>
    </div>
</template>

<script setup>

const handleIconClick = (node, e) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}
</script>

<style lang="scss" scoped>

</style>
