@extends('errors::minimal')

@section('title', __('Not Found'))
@section('code', '404')
@section('message', __('Not Found'))

{{-- @extends('errors::minimal')

@section('title', __('Not Found'))
@section('code', '404')
@section('message', __('Sorry, the page you are looking for could not be found.'))

@section('custom-content')
    <div class="text-center mt-8 space-y-16">
        <div class="flex justify-center">
            <img 
                src="{{ asset('storage/qwin-yasmin/letter-p.png') }}" 
                alt="Page not found illustration" 
                height="250"
            >
            <img 
                src="{{ asset('storage/qwin-yasmin/letter a.png') }}" 
                alt="Page not found illustration" 
                height="250"
            >
            <img 
                src="{{ asset('storage/qwin-yasmin/letter g.png') }}" 
                alt="Page not found illustration" 
                height="250"
            >
            <img 
                src="{{ asset('storage/qwin-yasmin/letter e.png') }}" 
                alt="Page not found illustration" 
                height="250"
            >
        </div>
        
        <div class="flex justify-center">
            <img 
                src="{{ asset('storage/qwin-yasmin/letter n.png') }}" 
                alt="Page not found illustration" 
                height="250"
            >
            <img 
                src="{{ asset('storage/qwin-yasmin/letter t.png') }}" 
                alt="Page not found illustration" 
                height="250"
            >
            <img 
                src="{{ asset('storage/qwin-yasmin/letter o.png') }}" 
                alt="Page not found illustration" 
                height="250"
            >
        </div>

        <div class="flex justify-center">
            <img 
                src="{{ asset('storage/qwin-yasmin/letter f.png') }}" 
                alt="Page not found illustration" 
                height="250"
            ><img 
                src="{{ asset('storage/qwin-yasmin/letter t.png') }}" 
                alt="Page not found illustration" 
                height="250"
            ><img 
                src="{{ asset('storage/qwin-yasmin/letter u.png') }}" 
                alt="Page not found illustration" 
                height="250"
            ><img 
                src="{{ asset('storage/qwin-yasmin/letter n.png') }}" 
                alt="Page not found illustration" 
                height="250"
            ><img 
                src="{{ asset('storage/qwin-yasmin/letter d.png') }}" 
                alt="Page not found illustration" 
                height="250"
            >
        </div>

        <a href="{{ url('/') }}" class="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-xl shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150 transform hover:scale-[1.02]">
            Go Home
        </a>
    </div>
@endsection --}}