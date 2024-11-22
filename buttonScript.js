var currentButton = "";
function ShowStates() {
    document.getElementById("content").innerHTML = "
  <table class="table table-striped table-success">
    <thead>
      <tr>
        <th scope="col" colspan="3">
          <h3 class="text-center">Positive Character States</h3>
        </th>
      </tr>
    </thead>
    <thead>
      <tr>
        <th scope="col">Icon</th>
        <th scope="col">State Name</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><img src="state_icons\hyper.png" class="img-fluid"></td>
        <td>Hyper State</td>
        <td>
          <p>Attack of Characters in this state x 2 additionally.</p>
          <p>Characters in this state will not be affected by Fatigue State, Hypnosis State, Windswept State, Paralyzed State, and Silenced State.</p>
        </td>
      </tr>
      <tr>
        <td><img src="state_iconsrenzy.png" class="img-fluid"></td>
        <td>Frenzied State</td>
        <td>Attack of Characters in this state x 2 additionally.</td>
      </tr>
      <tr>
        <td><img src="state_iconservent.png" class="img-fluid"></td>
        <td>Fervent State</td>
        <td>
          <p>Damage of Characters in this state will be dealt regardless of "Runestone Number Shield (First Batch)".</p>
          <p>Damage of Characters in this state will be dealt regardless of "Damage-reducing Resistance".</p>
        </td>
      </tr>
      <tr>
        <td><img src="state_iconslessed.png" class="img-fluid"></td>
        <td>Blessed State</td>
        <td>Combo count +5 for each Characters in this state.</td>
      </tr>
      <tr>
        <td><img src="state_icons	empest.png" class="img-fluid"></td>
        <td>Tempestuous State</td>
        <td>Attack of Characters in this state x 5 additionally.</td>
      </tr>
      <tr>
        <td><img src="state_icons	ao.png" class="img-fluid"></td>
        <td>Tao State</td>
        <td>
          <p>Attack of Characters in this state x 1.5 additionally.</p>
          <p>Characters in this state launch 2 extra attacks of their original Attribute as much as 50% of their Attack.</p>
          <p>Damage of Characters in this state will be dealt regardless of Human, Elf, and God enemies' Defense.</p>
        </td>
      </tr>
    </tbody>
  </table>

  <table class="table table-striped table-danger">
    <thead>
      <tr>
        <th scope="col" colspan="3">
          <h3 class="text-center">Negative Character States</h3>
        </th>
      </tr>
    </thead>
    <thead>
      <tr>
        <th scope="col">Icon</th>
        <th scope="col">State Name</th>
        <th scope="col">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><img src="state_iconsatigue.png" class="img-fluid"></td>
        <td>Fatigue State</td>
        <td>
          <p>Attack of Characters in this state is greatly reduced.</p>
          <p>Characters in this state will not be affected by Hypnosis State, Windswept State, Paralyzed State, and Silenced State.</p>
          <p>Characters in this state will not launch any attacks if their Attack is 0.</p>
        </td>
      </tr>
      <tr>
        <td><img src="state_icons\hypnosis.png" class="img-fluid"></td>
        <td>Hypnosis State</td>
        <td>
          <p>Characters in this state cannot launch any attacks.</p>
          <p>Characters in this state cannot activate their Active Skill.</p>
        </td>
      </tr>
      <tr>
        <td><img src="state_icons\windswept.png" class="img-fluid"></td>
        <td>Windswept State</td>
        <td>
          <p>Characters in this state cannot launch any attacks.</p>
          <p>Characters in this state cannot activate their Active Skill.</p>
          <p>Characters in this state cannot trigger their Character Runestone.</p>
        </td>
      </tr>
      <tr>
        <td><img src="state_icons\paralyze.png" class="img-fluid"></td>
        <td>Paralyzed State</td>
        <td>
          <p>Characters in this state cannot launch any attacks.</p>
          <p>CD of Characters in this state cannot be reduced by any means (including the Boss Skill "CD Restore").</p>
          <p>EP of Characters in this state cannot be restored by any means (including the Boss Skill "EP Restore").</p>
        </td>
      </tr>
      <tr>
        <td><img src="state_icons\silent.png" class="img-fluid"></td>
        <td>Silenced State</td>
        <td>
          <p>Characters in this state cannot activate their Active Skill.</p>
          <p>Dragonic Compulsion cannot be activated while there is a Character in this state.</p>
        </td>
      </tr>
      <tr>
        <td><img src="state_icons\lock1.png" class="img-fluid"></td>
        <td>Skill Lock</td>
        <td>
          <p>Characters in this state cannot activate their Active Skill.</p>
          <p>This state cannot be cleared by "Clear Additional Effect(s)" skills.</p>
        </td>
      </tr>
      <tr>
        <td><img src="state_icons\lock2.png" class="img-fluid"></td>
        <td>Skill & Attack Lock</td>
        <td>
          <p>Characters in this state cannot launch any attacks.</p>
          <p>Characters in this state cannot activate their Active Skill.</p>
          <p>This state cannot be cleared by "Clear Additional Effect(s)" skills.</p>
        </td>
      </tr>
      <tr>
        <td><img src="state_icons\dizzy.png" class="img-fluid"></td>
        <td>Dizzy State</td>
        <td>
          <p><b>This state is caused by the Wave Skill "Rocky Areas".</b></p>
          <p>Characters in this state cannot launch any attacks.</p>
          <p>Characters in this state cannot activate their Active Skill.</p>
          <p>Characters in this state cannot trigger their Character Runestone.</p>
        </td>
      </tr>
      <tr>
        <td><img src="state_icons\dotty.png" class="img-fluid"></td>
        <td>Dotty State</td>
        <td>
          <p><b>This state is caused by the Wave Skill "Icon-changing Areas".</b></p>
          <p>Characters in this state cannot activate their Active Skill.</p>
          <p>This state cannot be cleared by "Clear Additional Effect(s)" skills.</p>
        </td>
      </tr>
      <tr>
        <td><img src="state_icons\deadly.png" class="img-fluid"></td>
        <td>Deadly Dormancy</td>
        <td>
          <p>Characters in this state cannot launch any attacks.</p>
          <p>Characters in this state cannot activate their Active Skill.</p>
          <p>Characters in this state cannot trigger their Character Runestone.</p>
          <p>Characters in this state cannot be equipped with the Chronon Meter.</p>
          <p>This state cannot be cleared by "Clear Additional Effect(s)" skills.</p>
        </td>
      </tr>
    </tbody>
  </table>
";
    SetCurrentButtonId("stateButton");
}
