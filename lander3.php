<?php
/**
 *
 * Template name: Lander 3
 *
 */

global $paged;
if (!isset($paged) || !$paged){
    $paged = 1;
}

$context = Timber::get_context();

$args = array(
    'post_type' => 'post',
    'numberposts' => 10,
    'orderby' => array(
        'date' => 'DESC'
    ),
    'paged' => $paged
);
$context['posts'] = new Timber\PostQuery($args);
$context['page_categories'] = Timber::get_terms('categories');

$templates = array( 'home-loadmore.twig' );
Timber::render( $templates, $context );
