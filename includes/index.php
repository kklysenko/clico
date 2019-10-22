<?php // Silence is golden

add_action( 'wp_ajax_update_clico_value', 'update_clico_value', 98 );
add_action( 'wp_ajax_nopriv_update_clico_value', 'update_clico_value', 98 );

add_action( 'wp_ajax_get_clico_value', 'get_clico_value', 97 );
add_action( 'wp_ajax_nopriv_get_clico_value', 'get_clico_value', 97 );

function update_clico_value(){
	$id = $_POST['id'];
	$key = 'click_amount';
	$value = get_post_meta($id, $key, true);
	if ( $value == '' ) {
		add_post_meta( $id, $key, 1 );
	} else {
		update_post_meta( $id, $key, $value + 1 );
	}
	echo $value;
	wp_die();

}

function get_clico_value(){
	$id = $_POST['id'];
	$key = 'click_amount';
	$value = get_post_meta($id, $key, true);

	if ( $value == '' && $value > 0 ) {
		echo '0';
	} else {
		echo $value;
	}
	wp_die();
}