import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONObject;

@Path("/metrics")
public class Service2 {

	@GET
	@Path("/kelvintoF/{k}")
	@Produces("application/json")
	public Response calculateFahrenheit(@PathParam("k")Double a)
	{
		Double Fahrenheit = (a - 273.15) * 1.8 + 32.0;
		Fahrenheit = (double) Math.round(Fahrenheit);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("Fahrenheit", Fahrenheit);
		String result = ""+jsonObject;
		return Response.status(200).entity(result)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.build();
	}
	
	@GET
	@Path("/kelvintoC/{k}")
	@Produces("application/json")
	public Response calculateCelcius(@PathParam("k")Double a)
	{
		Double Celcius = (a - 273.15);
		JSONObject jsonObject = new JSONObject();
		Celcius =(double) Math.round(Celcius); 
		jsonObject.put("Celcius", Celcius);
		String result = ""+jsonObject;
		return Response.status(200).entity(result)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.build();
	}
}
