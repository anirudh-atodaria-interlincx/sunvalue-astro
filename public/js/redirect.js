if (!(new URL(document.location)).searchParams.get('id')) {
    window.location.replace('/404')
}
