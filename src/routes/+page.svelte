<script>
	import { onMount } from 'svelte';

    export let data;

    onMount(() => {
        setTimeout(redirectHome, 2000);
    })

    function redirectHome() {
        if (data.user) {
	    	window.location.href = "/creditors";
		} else {
    		window.location.href = "/login";
		}
    }
</script>

<div class="my-52 w-full flex items-center justify-center">
    <svg width="62.4" height="85.6" viewBox="0 0 312 428" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="312" height="428" rx="28" fill="url(#paint0_linear_6_2)"/>
    <path d="M49 52H179" stroke="white" stroke-width="15" stroke-linecap="round">
        <animate
            attributeName="stroke-opacity"
            values="1;0.8;0.6;0.4;0.2;1"
            dur="1.5s"
            repeatCount="indefinite" />
    </path>
    <path d="M231 52H263" stroke="white" stroke-width="15" stroke-linecap="round">
        <animate
            attributeName="stroke-opacity"
            values="1;0.8;0.6;0.4;0.2;1"
            dur="1.5s"
            repeatCount="indefinite" />
    </path>
    <path d="M49 97H179" stroke="white" stroke-opacity="0.8" stroke-width="15" stroke-linecap="round">
        <animate
            attributeName="stroke-opacity"
            values="0.8;0.6;0.4;0.2;1;0.8"
            dur="1.5s"
            repeatCount="indefinite" />
    </path>
    <path d="M231 97H263" stroke="white" stroke-opacity="0.8" stroke-width="15" stroke-linecap="round">
        <animate
            attributeName="stroke-opacity"
            values="0.8;0.6;0.4;0.2;1;0.8"
            dur="1.5s"
            repeatCount="indefinite" />
    </path>
    <path d="M49 143H179" stroke="white" stroke-opacity="0.6" stroke-width="15" stroke-linecap="round">
        <animate
            attributeName="stroke-opacity"
            values="0.6;0.4;0.2;1;0.8;0.6"
            dur="1.5s"
            repeatCount="indefinite" />
    </path>
    <path d="M231 143H263" stroke="white" stroke-opacity="0.6" stroke-width="15" stroke-linecap="round">
        <animate
            attributeName="stroke-opacity"
            values="0.6;0.4;0.2;1;0.8;0.6"
            dur="1.5s"
            repeatCount="indefinite" />
    </path>
    <path d="M49 188H179" stroke="white" stroke-opacity="0.4" stroke-width="15" stroke-linecap="round">
        <animate
            attributeName="stroke-opacity"
            values="0.4;0.2;1;0.8;0.6;0.4"
            dur="1.5s"
            repeatCount="indefinite" />
    </path>
    <path d="M231 188H263" stroke="white" stroke-opacity="0.4" stroke-width="15" stroke-linecap="round">
        <animate
            attributeName="stroke-opacity"
            values="0.4;0.2;1;0.8;0.6;0.4"
            dur="1.5s"
            repeatCount="indefinite" />
    </path>
    <path d="M49 234H179" stroke="white" stroke-opacity="0.2" stroke-width="15" stroke-linecap="round">
        <animate
            attributeName="stroke-opacity"
            values="0.2;1;0.8;0.6;0.4;0.2"
            dur="1.5s"
            repeatCount="indefinite" />
    </path>
    <path d="M231 234H263" stroke="white" stroke-opacity="0.2" stroke-width="15" stroke-linecap="round">
        <animate
            attributeName="stroke-opacity"
            values="0.2;10.8;0.6;0.4;0.2"
            dur="1.5s"
            repeatCount="indefinite" />
    </path>
    <defs>
    <linearGradient id="paint0_linear_6_2" x1="156" y1="0" x2="156" y2="428" gradientUnits="userSpaceOnUse">
    <stop/>
    <stop offset="0.538462" stop-color="#010000"/>
    <stop offset="1" stop-color="#B10000"/>
    </linearGradient>
    </defs>
    </svg>
</div>