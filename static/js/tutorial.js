function buttonAction(n) {
	var text =	"PREFIX dbo: <http://dbpedia.org/ontology/>\n" +
				"PREFIX dbr: <http://dbpedia.org/resource/>\n" +
				"PREFIX dbr2: <http://dbpedia.org/resource/Category:>\n" +
				"PREFIX dct: <http://purl.org/dc/terms/>\n" +
				"PREFIX db: <http://dbpedia.org/>\n" +
				"PREFIX travel: <http://www.semanticweb.org/maryse/ontologies/2015/9/untitled-ontology-30#>\n" +
				"PREFIX dbp: <http://dbpedia.org/property/>\n";
	switch (n) {
		case 1:
			text += "\ \
SELECT * WHERE {\n \
  ?Museum rdf:type dbo:Museum .\n \
  ?Museum dbo:location ?City .\n \
  ?City rdf:type travel:CapitalInEurope .\n \
}";
			break;
		case 2:
			text += "\ \
SELECT * WHERE {\n \
  ?HikingTrail rdf:type dbo:HikingTrail .\n \
  ?HikingTrail dbp:locatedIn ?Country .\n \
  ?Country rdf:type travel:UKCountry .\n \
}";
			break;
		case 3:
			text += "\ \
SELECT * WHERE {\n \
  ?Mountain rdf:type dbo:Mountains .\n \
  ?Mountain dbo:locatedInArea ?State .\n \
  ?State rdf:type travel:AmericanState .\n \
}";
			break;
		case 4:
			text += "\ \
SELECT * WHERE {\n \
	?Link rdf:type travel:AmusementParken .\n \
    ?Link rdfs:label ?AmusementPark .\n \
}";
			break;
		default:
			text = "default";
			break;

	}
	document.getElementById("query14").value = text;
}


/*
// ############
//    STEP 1
// ############
*/

// If the element with id 'link1' is clicked
$('#link1').on('click', function(e){
	var bootstrapCSSLink = $('<link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">');
	var bootstrapThemeCSSLink = $('<link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">');
	var bootstrapJavaScriptLink = $('<script type="text/javascript" src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>');
	
	$('body').append(bootstrapCSSLink);
	$('body').append(bootstrapThemeCSSLink);
	$('body').append(bootstrapJavaScriptLink);	
});

/*
// ############
//    STEP 14
// ############
*/

$('[id=reason]').on('click', function(e){
	
	var query = $('#query14').val();
	var endpoint = 'http://localhost:5820/TravelBACKUP/query';
	var format = 'JSON', reasoning;

	switch($(this).html()) {
		case "No Inferencing":
			reasoning = false;
			break;
		case "Inferencing":
			reasoning = true;
			break;
		default:
			reasoning = false;
			break;
	}

	$.get('/sparql',data={'endpoint': endpoint, 'query': query, 'format': format, 'reasoning': reasoning}, function(json){
		
		try {
			var vars = json.head.vars;
		
			var ul = $('<ul></ul>');
			ul.addClass('list-group');
		
			$.each(json.results.bindings, function(index,value){
				var li = $('<li></li>');
				li.addClass('list-group-item');
			
				$.each(vars, function(index, v){
					var v_type = value[v]['type'];
					var v_value = value[v]['value'];
					var v_value2 = value[v]['value'];
					v_value = v_value.replace("http://dbpedia.org/resource/", '');
					v_value = v_value.replace("hhttp://www.wikidata.org/entity/", '');
					li.append('<strong>'+v+'</strong><br/>');
				
					// If the value is a URI, create a hyperlink
					if (v_type == 'uri') {
						var a = $('<a></a>');
						a.attr('href',v_value2);
						a.text(v_value);
						li.append(a);
					// Else we're just showing the value.
					} else {
						li.append(v_value);
					}
					li.append('<br/>');
					
				});
				ul.append(li);
			
			});
			
			$('#linktarget14').html(ul);
		} catch(err) {
			$('#linktarget14').html('Something went wrong!');
		}
		

		
	});
	
});


