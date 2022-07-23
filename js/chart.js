var values = { v1: 0, v2: 0, v3: 0 };

$(document).ready(function () {
	var size = $('.row>div').width() * 0.8;

	$('#warning').css('width', size);
	$('#warning').css('height', size);

	$('#success').css('width', size);
	$('#success').css('height', size);

	$('#fail').css('width', size);
	$('#fail').css('height', size);

  var gradient = [
  	{
    	x0: 0, y0: 0,
      x1: 1, y1: 0.5,
      colorStops: [{ offset: 0, color: '#f9e094' }, { offset: 1, color: '#ecb304' }]
  	},
  	{
    	x0: 0, y0: 0,
      x1: 1, y1: 0.5,
      colorStops: [{ offset: 0, color: '#ccfdce' }, { offset: 1, color: '#01b906' }]
  	},
  	{
    	x0: 0, y0: 0,
      x1: 1, y1: 0.5,
      colorStops: [{ offset: 0, color: '#fbc8c8' }, { offset: 1, color: '#b90202' }]
  	}
  ];

  var anchorGradient = {
    type: 'radialGradient',
    x0: 0.35, y0: 0.35, r0: 0.0,
    x1: 0.35, y1: 0.35, r1: 1,
    colorStops: [{ offset: 0, color: '#ffffff' }, { offset: 1, color: '#252E32'}]
  };

  var params = [];

  for (var i = 0; i < 3; i++) {
  	params.push({
      background: '#F7F7F7',
      border: {
        lineWidth: 0,
        strokeStyle: '#76786A',
        padding: 16
      },
      shadows: {
         enabled: true
      },
      anchor: {
        visible: true,
        fillStyle: anchorGradient,
        radius: 0.10
      },
      tooltips: {
        disabled: false,
        highlighting: true
      },
      scales: [
      	{
					minimum: 0,
					maximum: 100,
					startAngle: -225,
					endAngle: 45,
					majorTickMarks: {
					  length: 12,
					  lineWidth: 2,
					  interval: 10,
					  offset: 0.8
					},
          minorTickMarks: {
						visible: true,
						length: 8,
						lineWidth: 2,
						interval: 2,
						offset: 0.8
          },
          labels: {
						orientation: 'horizontal',
						stringFormat: '%d%%',
						interval: 10,
						offset: 1.00
          },
          needles: [
            {
              value: 0,
              type: 'pointer',
              outerOffset: 0.8,
              mediumOffset: 0.7,
              width: 10,
              fillStyle: '#044f9d'
            }
          ],
          ranges: [
            {
              outerOffset: 0.78,
              innerStartOffset: 0.74,
              innerEndOffset: 0.55,
              startValue: 0,
              endValue: 100,
              fillStyle: gradient[i]
            }
         ]
       	}
      ]
    });
  }

  $('#warning').jqRadialGauge(params[0]);
  $('#success').jqRadialGauge(params[1]);
  $('#fail').jqRadialGauge(params[2]);

  updateGauge(100, 100, 100);

  setTimeout(function() {
  	updateGauge($('#warning').data('value'), $('#success').data('value'), $('#fail').data('value'));
  }, 600);

  $(window).resize(function() {
  	var size = $('.row>div').width() * 0.8;

  	$('#warning').css('width', size);
  	$('#warning').css('height', size);

  	$('#success').css('width', size);
  	$('#success').css('height', size);

  	$('#fail').css('width', size);
  	$('#fail').css('height', size);
  });
});

function updateGauge(v1, v2, v3) {
  $(values).animate({
      v1: v1,
      v2: v2,
      v3: v3
  },
  {
    duration: 1000,
    step: function () {
      var scales1 = $('#warning').jqLinearGauge('option', 'scales');
      var scales2 = $('#success').jqLinearGauge('option', 'scales');
      var scales3 = $('#fail').jqLinearGauge('option', 'scales');

      scales1[0].needles[0].value = values.v1;
      scales2[0].needles[0].value = values.v2;
      scales3[0].needles[0].value = values.v3;

      $('#warning').jqLinearGauge('update');
      $('#success').jqLinearGauge('update');
      $('#fail').jqLinearGauge('update');
    }
  });
}