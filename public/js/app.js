(function() {
	// cache DOM elements.
	var nameEl = document.querySelector(".name"),
		definitionEl = document.querySelector(".definition"),
		testsEl = document.querySelector(".tests"),
		codeEl = document.querySelector(".code"),
		executeButton = document.querySelector(".execute"),
		testResults = document.querySelector(".testResults"),
		errorEl = document.querySelector(".error"),
		showSolutionButton = document.querySelector(".showSolution"),
		solutionEl = document.querySelector(".solution");

	buildTemplate();

	executeButton.addEventListener("click", function() {
		errorEl.innerHTML = "";
		var indirectEval = eval;
		indirectEval(codeEl.value); // evals the code within the global scope.
		runTests();
	});

	function buildTemplate() {
		if (isDefined(data) && data) {
			codeEl.value = isDefined(data.functionDefinition) ? data.functionDefinition : "";
			nameEl.innerHTML = isDefined(data.name) ? data.name : "";
			definitionEl.innerHTML = isDefined(data.definition) ? data.definition : "";

			if (isArray(data.tests)) {
				data.tests.forEach(function(test) {
					testsEl.innerHTML += "<li class='test'>" + test.definition + " -> " + test.result + "</li>";
				});
			};
		};
	};

	function isDefined(value) {
		return !(typeof value === "undefined");
	}

	function isArray(value) {
		return isDefined(value) && value instanceof Array;
	}

	function runTests() {

		if (isDefined(window[data.function]) && isArray(data.tests)) {

			var testsEl = document.querySelectorAll('.test');

			testResults.innerHTML = "";

			data.tests.forEach(function(test, i) {
				testsEl[i].innerHTML = test.definition + " -> " + test.result + " " + (checkTest(test) == test.result ? "<span class='passed'>PASSED" : "<span class='failed'>FAILED") + "</span>";
			});
		}

		function checkTest(test) {
			return window[data.function].apply(window, test.params);
		}

	};

	window.onerror = function(message) {
		errorEl.innerHTML = message;
	};

})();