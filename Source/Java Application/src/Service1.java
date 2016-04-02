import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONException;
import org.json.JSONObject;

@Path("/calculate")
public class Service1 {

	@GET
	@Path("/si/{p}/{t}/{r}")
	@Produces("application/json")
	public Response calculateSimpleInterest(@PathParam("p")double d,@PathParam("t")double e, @PathParam("r")double f) throws JSONException
	{
		double simpleInterest = d*e*f;
		simpleInterest = simpleInterest / 100;
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("SimpleInterest", simpleInterest); 
		String result = ""+jsonObject;
		return Response.status(200).entity(result)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.build();
	}
	
	@GET
	@Path("/ci/{p}/{r}/{n}/{t}")
	@Produces("application/json")
	public Response calculateCompound(@PathParam("p")double i, @PathParam("r")double d, @PathParam("n")double j, @PathParam("t")double e)
	{
		d = d/100;
		double compoundInterest = (double) (i * (1 + d / j));
		compoundInterest = (double) Math.pow(compoundInterest, j*e);
		compoundInterest = Math.round(compoundInterest);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("CompoundInterest", compoundInterest);
		String result = ""+jsonObject;
		return Response.status(200).entity(result)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
				.build();
	}
}
