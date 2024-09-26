<script>
    import ProtectedRoute from '$lib/components/ProtectedRoute.svelte';
    import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from '$lib/components/ui/card';
    import { cardDetails } from '$lib/Common/Rendering_Data/service_homepage_data';
    let cards = Object.values(cardDetails);
</script>

<ProtectedRoute>

<div class="pt-2">
    <h2 class="text-2xl font-bold text-center tracking-tight">Services</h2>
</div>
<div class="container mx-auto px-4 mt-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"> <!-- Increased gap size -->
        {#each cards as card}
            <a href={card.url} class="block">
                <Card 
                    class="hover:shadow-lg transition-shadow duration-200 transform hover:scale-105 transition-transform duration-300
                    dark:hover:shadow-gray-600 hover:shadow-gray-200"> <!-- Scaling animation and shadow for light/dark mode -->
                    <CardHeader>
                        <CardTitle>{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{card.description}</CardDescription>
                    </CardContent>
                </Card>
            </a>
        {/each}
    </div>
</div>
</ProtectedRoute>