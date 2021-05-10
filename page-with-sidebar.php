<?php
/**
 * Template name: Page with sidebar
 *
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
Timber::render( 'page/page-with-sidebar.twig', $context );
