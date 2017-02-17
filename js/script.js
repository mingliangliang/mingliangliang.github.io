/**
	Scripting for the Monochrome Theme
	@author jordan grozdanov
	
	Used with JQuery.
	
**/


//	wait for the document to be ready

$( document ).ready( function() {
	
	// animator object
	
	// _____
	// props :
	// state : 
	// {
	//  seconds,
	//  minutes,
	//  hours,
	//  days
	// }
	// days
	// hours
	// minutes
	
	// _________
	// constants :
	// SECONDS_DEGREE
	// MINUTES_DEGREE
	// HOURS_DEGREE
	// DAYS_DEGREE
	
	// _______
	// methods :
	//  - init
	//  - collect
	//  - animate
	//  - rotate
	//  - go
	
	
	var animator = {};
	
	animator.state = {};
	
	//////// constants
	// change those to change the angle of rotation for each circle
	
	animator.SECONDS_DEGREE = 30;
	animator.MINUTES_DEGREE = 60;
	animator.HOURS_DEGREE   = 90;
	animator.DAYS_DEGREE    = 180;
	
	
	//////// init method
	// randomly rotates the circles and attaches the classes
	animator.init = function() {
		var shuff;
		
		this.state.seconds = this.SECONDS_DEGREE;
		shuff = Math.round( Math.random() * 4 );
		this.state.minutes = ( this.MINUTES_DEGREE * shuff ) % 360;
		shuff = Math.round( Math.random() * 3 );
		this.state.hours = ( this.HOURS_DEGREE * shuff ) % 360;
		shuff = Math.round( Math.random() * 2 );
		this.state.days = ( this.DAYS_DEGREE * shuff ) % 360;
		
		// add the random positions
		// and push the state forward so they still animate the first time
		$( "#minutes" ).addClass( "rotate" + this.state.minutes );
		this.state.minutes += animator.MINUTES_DEGREE;
		$( "#hours" ).addClass( "rotate" + this.state.hours );
		this.state.hours += animator.HOURS_DEGREE;
		$( "#days" ).addClass( "rotate" + this.state.days );
		this.state.days += animator.DAYS_DEGREE;
	};
	
	
	///////// collect method
	// collect the state of rotation for each circle
	animator.collect = function( days, hours, minutes ) {
		this.days = days;
		this.hours = hours;
		this.minutes = minutes;
	};
	
	
	//////// go method
	// starts the animation
	animator.go = function( days, hours, minutes ) {
		if( this.days === undefined ) {
			return;
		}
		if( this.minutes !== minutes ) {
			// animate the minutes
			this.rotate( "minutes" );
			this.animate( $( "#minutes-inner" ) );
		}
		if( this.hours !== hours ) {
			// animate the hours
			this.rotate( "hours" );
			this.animate( $( "#hours-inner" ) );
		}
		if( this.days !== days ) {
			// animate the days
			this.rotate( "days" );
			this.animate( $( "#days-inner" ) );
		}
		
		//animate the seconds anyway
		this.rotate( "seconds" );
	};
	
	
	///////// animate method
	// animates the inner white circle
	animator.animate = function( selector ) {
		selector.hide();
		selector.slideDown();
	};
	
	
	///////// rotate method
	// circles rotation logic
	// pass one of the strings : seconds, minutes, hours, days
	animator.rotate = function( target ) {
		var selector,
			degree,
			pointer; // used to reach the state
		
		if( target === "seconds" ) {
			selector = $( "#seconds" );
			degree = animator.SECONDS_DEGREE;
			pointer = "seconds";
		}
		if( target === "minutes" ) {
			selector = $( "#minutes" );
			degree = animator.MINUTES_DEGREE;
			pointer = "minutes";
		}
		if( target === "hours" ) {
			selector = $( "#hours" );
			degree = animator.HOURS_DEGREE;
			pointer = "hours";
		}
		if( target === "days" ) {
			selector = $( "#days" );
			degree = animator.DAYS_DEGREE;
			pointer = "days";
		}
		
		if( this.state[ pointer ] === 0 ) {
			selector.hide().removeClass().addClass( 'ticker clear-transition' );
			// a little hack here
			
			// when we remove the rotation class, the css transition rotates the element
			// back to its original position and we don't want that, so we rotate it back real fast
			// while it's hidden and then show it back
			// we lose the last transition this way but it is the best option
			setTimeout( function() {
				selector.show().removeClass( 'clear-transition' ).addClass( pointer + '-transition' );
			}, 2);
		}
		
		selector.addClass( 'rotate' + this.state[ pointer ] );
		this.state[ pointer ] = ( this.state[ pointer ] + degree ) % 360;
	};
	
	
	//////// tick function
	// countdown logic
	// collect the animation state data and perform animation
	var tick = function() {
		var now = new Date();
		
		///// the until variable holds the time you want to count to.
		///// place the date in the Date object constructor in the following format:
		///// YYYY, MM, DD 
		///// the month starting from 0, that's why I wrote it 12 - 1
		var until = new Date( 2012, 12 - 1, 31 );
		var diff = until.getTime() - now.getTime();
		
		if( diff < 0 ) {
			throw new Error( "Until should be later in time than now" );
		}
		
		var x = diff / 1000;
		var seconds = parseInt( x % 60 );
		x /= 60;
		var minutes = parseInt( x % 60 );
		x /= 60;
		var hours = parseInt( x % 24 );
		x /= 24;
		var days = parseInt( x );
		
		$( "#t-days" ).text( days );
		$( "#t-hours" ).text( hours );
		$( "#t-minutes" ).text( minutes );
		$( "#t-seconds" ).text( seconds );
		
		animator.go( days, hours, minutes );
		animator.collect( days, hours, minutes );
		
		// call it recursively each second
		setTimeout( tick, 1000 );
	};
	
	
	//////// So, let's go!
	animator.init();
	tick();
	
	
	//////// Let's handle our favourite IE!
	//////// Jquery placeholder fallback
	if (! ("placeholder" in document.createElement("input"))) {
        $('*[placeholder]').each(function() {
            $this = $(this);
            var placeholder = $(this).attr('placeholder');
            if ($(this).val() === '') {
                $this.val(placeholder);
            }
            $this.bind('focus',
            function() {
                if ($(this).val() === placeholder) {
                    this.plchldr = placeholder;
                    $(this).val('');
                }
            });
            $this.bind('blur',
            function() {
                if ($(this).val() === '' && $(this).val() !== this.plchldr) {
                    $(this).val(this.plchldr);
                }
            });
        });
        $('form').bind('submit',
        function() {
            $(this).find('*[placeholder]').each(function() {
                if ($(this).val() === $(this).attr('placeholder')) {
                    $(this).val('');
                }
            });
        });
    }
});