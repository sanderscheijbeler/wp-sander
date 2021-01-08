<?php
/**
 * Template Name: List
 *
 */

$context = Timber\Timber::get_context();
$post = new Timber\Post();
$context['post'] = $post;

$postType = get_field('cf_list_filter');

$args = array(
    // Get post type project
    'post_type' => $postType,
    // Get all posts
    'posts_per_page' => -1,
    // Order by post date
    'orderby' => array(
        'date' => 'DESC'
    ),
);

$posts = Timber\Timber::get_posts($args);
$context['items'] = $posts;

$taxonomies = array();
foreach ($posts as $item) {
    $taxonomies = array_merge($taxonomies, get_post_taxonomies($item));
}
$taxonomies = array_unique($taxonomies);

$terms = get_terms(
    array(
        'taxonomy' => $taxonomies,
        'hide_empty' => false,
    )
);

// Get all career categories for filters
$context['filters'] = $terms;

Timber\Timber::render('page/page-list.twig', $context);
